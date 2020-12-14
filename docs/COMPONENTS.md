# Компоненты

## Приложение для настройки параметров VPAID фильтрации

Angular-Spring приложение, с аутентификацией и 1й пользовательской ролью.

## Поставщик VPAID XML-файлов

NGINX отдает с файловой системы сгенерированный XML.

## Регистратор VPAID-событий

Парсинг NGINX access лога.
Предполагается учет следующих событий:
1. Запрос на показ рекламы. Происходит при обращении плеера за сгенерированным нами VAST c VPAID по тегу. Требует конфигурации NGINX.
2. Событие показа рекламы (impression), генерируемое тегом VAST `impression`. Если удовлетворительным является ответ `404`, то NGINX можно не конфигурировать.

Сценарии:
1. Постоянный сбор логов
2. Пакетный сбор логов (при ротации)
3. Загрузка данный из старых логов (первоначальный сбор статистики, восстановление после перерыва в работе)

Альтернативы:
1. Отдельный процесс (log-miner) разбирает NGINX access лог при ротации и складывает в Clickhouse.
   - https://github.com/nielsbasjes/logparser   
2. NGINX (Filebeat | Syslog) -> Logstash -> (Clickhouse | Elasticsearch)
   - https://rzetterberg.github.io/nginx-elk-logging.html
   - https://altinity.com/blog/2017/12/18/logstash-with-clickhouse      
   - Q: Syslog поддерживает указатель на последний прочитанный лог файл? Если нет, то только через Filebeat 
   - R: logstash-output-clickhouse не работает на последней версии Logstash? (https://github.com/funcmike/logstash-output-clickhouse)
3. NGINX -> Vector -> Clickhouse
   - https://github.com/timberio/vector
   - https://pcnews.ru/blogs/otpravka_nginx_json_logov_s_pomosu_vector_v_clickhouse_i_elasticsearch-1006271.html
    
Elasticsearch VS Clickhouse:
- не требуется полнотекстовый поиск по результатам -> CH
- добавление новых полей в будущем проще в ES, в CH потребуется (ALTER TABLE | миграция?)
- данных из ES прекрасно визуализируются в Kibana; для CH можно максимум через плагин прикрутить Graphana

### Vector

Риски:
- Нестабильное API. К примеру, хранение чекпойнтов. Сейчас - по файлу на каждый файл, в следующей версии - один файл, потенциально в будущем - отдельное решение.

Поддерживаемые сценарии:
- Vector can be restarted and resumed, starting where it left off
- Vector can be restarted and resumed, even if the file has been rotated / renamed.
- Vector can be restarted, the file can be truncated, and Vector will start reading from the beginning.

Подробности:
- https://github.com/timberio/vector/issues/147
- https://github.com/timberio/vector/issues/457
- https://github.com/timberio/vector/pull/673

Q: Как перечитать все лог файлы?
A: Достаточно удалить чекпойнт файла(?) 
- Чекпойнты по каждому файлу хранятся в директории `/var/lib/vector/in/checkpoints/` в формате `dbe195a4f7e5768e.2698`, где `<in>` - это название источника
- В новой версии все чекпойнты хранятся в одном файле (https://github.com/timberio/vector/pull/4899)
A: Поставить `start_at_beginning` в `true`
  
Сигнал nginx на переоткрытие лог файла:
`sudo pkill -USR1 nginx`

#### Настройка пайплайна

`/etc/nginx/nginx.conf`:
```shell
log_format preved '$remote_addr - $remote_user [$time_iso8601] "$request" '
                   '$status $body_bytes_sent "$http_referer" '
                   '"$http_user_agent" "$http_x_forwarded_for"';

access_log  /var/log/nginx/access.log  preved;
```

`/etc/vector/vector.toml`
```shell
[sources.in]
  include = ["/var/log/nginx/access.log"]
  type = "file"

[transforms.nginx_parser]
  inputs = ["in"]
  type = "regex_parser"
  field = "message"
  patterns = ['^(?P<host>[\w\.]+) - (?P<user>[^ ]+) \[(?P<timestamp>.*)\] "(?P<method>[\w]+) (?P<path>[^ ]+) (?P<proto>[^ ]+)" (?P<status>[\d]+) (?P<bytes_out>[\d]+) "(?P<referer>[^"]+)" "(?P<agent>[^"]+)" "(?P<forwarded>[^"]+)"$']

[transforms.coercer]
  type = "coercer"
  inputs = ["nginx_parser"]
  types.timestamp = "timestamp"

[sinks.out]
  host = "http://localhost:8123"
  inputs = ["coercer"]
  table = "nginx_log"
  type = "clickhouse"
  encoding.only_fields = ["host", "user", "bytes_in", "timestamp", "method", "path", "status", "bytes_out", "referer", "agent", "forwarded"]
  encoding.timestamp_format = "unix"

[[tests]]
  name = "test nginx regex"

  [[tests.inputs]]
    insert_at = "nginx_parser"
    type = "raw"
    value = "127.0.0.1 - - [2020-11-11T17:36:31+03:00] \"GET / HTTP/1.1\" 200 612 \"-\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36\" \"-\""

  [[tests.outputs]]
    extract_from = "nginx_parser"
    [[tests.outputs.conditions]]
      type = "check_fields"
      "method.eq" = "GET"
      "host.eq" = "127.0.0.1"
      "timestamp.eq" = "2020-11-11T17:36:31+03:00"
      "path.eq" = "/"
      "status.eq" = "200"
      "agent.eq" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36"
      "referer.eq" = "-"
      "forwarded.eq" = "-"
```

Clickhouse:
```sql
CREATE TABLE nginx_log(
    host String,
    user String,
    bytes_in Int16,
    timestamp DateTime('UTC'),
    method String,
    path String,
    proto String,
    status Int16,
    bytes_out Int16,
    referer String,
    agent String,
    forwarded String
) ENGINE = MergeTree()
    PARTITION BY toYYYYMMDD(timestamp)
    ORDER BY timestamp
    TTL timestamp + toIntervalMonth(1);
```

```sql
CREATE USER 'admin' IDENTIFIED WITH plaintext_password BY 'password';
SET allow_introspection_functions=1;
GRANT ALL ON *.* TO 'admin' WITH GRANT OPTION;
```