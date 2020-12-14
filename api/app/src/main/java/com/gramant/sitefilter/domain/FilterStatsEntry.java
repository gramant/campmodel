package com.gramant.sitefilter.domain;

import lombok.Getter;
import lombok.experimental.Accessors;

import java.util.UUID;

@Getter
@Accessors(fluent = true)
public class FilterStatsEntry {

    private final UUID id;
    private final String name;
    private final int requests;
    private final int views;

    public FilterStatsEntry(UUID id, String name, int requests, int views) {
        this.id = id;
        this.name = name;
        this.requests = requests;
        this.views = views;
    }
}
