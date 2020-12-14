package com.gramant.sitefilter.adapters.web.data;

import com.gramant.sitefilter.domain.FilterStatsEntry;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FilterStatsRepresentation {
    private final String id;
    private final String name;
    private final int requests;
    private final int views;

    public static FilterStatsRepresentation from(FilterStatsEntry filterStatsEntry){
        return new FilterStatsRepresentation(filterStatsEntry.id().toString(),
                filterStatsEntry.name(),
                filterStatsEntry.requests(),
                filterStatsEntry.views());
    }

}
