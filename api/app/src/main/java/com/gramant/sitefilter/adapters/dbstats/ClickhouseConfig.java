package com.gramant.sitefilter.adapters.dbstats;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import ru.yandex.clickhouse.ClickHouseDataSource;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
public class ClickhouseConfig {

    @Bean
    @ConfigurationProperties("clickhouse")
    public Properties statsDataSourceProperties() {
        return new Properties();
    }
    @Bean("clickhouseDataSource")
    public DataSource clickhouseDataSource(Properties statsDataSourceProperties) {
        return new ClickHouseDataSource(statsDataSourceProperties.getProperty("url"), statsDataSourceProperties);
    }

    @Bean
    public NamedParameterJdbcTemplate clickhouseJdbc(@Qualifier("clickhouseDataSource") DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }
}
