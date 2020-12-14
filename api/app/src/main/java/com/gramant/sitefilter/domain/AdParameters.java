package com.gramant.sitefilter.domain;

public class AdParameters {
    private final String serverUrl;
    private final String vastTag;
    private final Integer minWidth;
    private final Integer minHeight;
    private final String eventVastImpressionUrl;
    private final String eventCheckBeforeLoadWrongSizeUrl;

    public AdParameters(String serverUrl, String vastTag, Integer minWidth, Integer minHeight, String eventVastImpressionUrl, String eventCheckBeforeLoadWrongSizeUrl) {
        this.serverUrl = serverUrl;
        this.vastTag = vastTag;
        this.minWidth = minWidth;
        this.minHeight = minHeight;
        this.eventVastImpressionUrl = eventVastImpressionUrl;
        this.eventCheckBeforeLoadWrongSizeUrl = eventCheckBeforeLoadWrongSizeUrl;
    }

    public String getServerUrl() {
        return serverUrl;
    }

    public String getVastTag() {
        return vastTag;
    }

    public Integer getMinWidth() {
        return minWidth;
    }

    public Integer getMinHeight() {
        return minHeight;
    }

    public String getEventVastImpressionUrl() {
        return eventVastImpressionUrl;
    }

    public String getEventCheckBeforeLoadWrongSizeUrl() {
        return eventCheckBeforeLoadWrongSizeUrl;
    }
}
