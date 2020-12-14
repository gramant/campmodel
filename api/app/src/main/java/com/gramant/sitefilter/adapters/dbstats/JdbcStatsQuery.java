package com.gramant.sitefilter.adapters.dbstats;

import com.gramant.sitefilter.domain.FilterStatsEntry;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class JdbcStatsQuery {

    private final NamedParameterJdbcTemplate clickhouseJdbc;

    public Collection<FilterStatsEntry> stats() {
        List<Map<String, Object>> maps = clickhouseJdbc.queryForList("select * from nginx_log", Collections.emptyMap());
        return List.of(
                new FilterStatsEntry(UUID.randomUUID(), "PK1", 123456, 1234),
                new FilterStatsEntry(UUID.randomUUID(), "PK2", 456789, 3456),
                new FilterStatsEntry(UUID.randomUUID(), "PK3", 23456876, 1003000)
        );
    }
}
