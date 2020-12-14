package com.gramant.sitefilter.adapters.web.data;

public class CreateVastRequest {
    private String companyName;
    private  String vastTag;
    private  Integer minWidth;
    private  Integer minHeight;

    public CreateVastRequest() {
    }

    public CreateVastRequest(String companyName, String vastTag, Integer minWidth, Integer minHeight) {
        this.companyName = companyName;
        this.vastTag = vastTag;
        this.minWidth = minWidth;
        this.minHeight = minHeight;
    }

    public String getCompanyName() {
        return companyName;
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
}
