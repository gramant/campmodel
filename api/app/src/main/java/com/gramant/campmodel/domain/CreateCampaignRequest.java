package com.gramant.campmodel.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;


public class CreateCampaignRequest {

    private String name;
    private Product.ProductId productId;
    private Campaign.Calculation calculationMethod;
    private Integer budget;
    private Integer weeks;

    @JsonCreator
    public CreateCampaignRequest(@JsonProperty("name") String name,
                                 @JsonProperty("productId") Product.ProductId productId,
                                 @JsonProperty("calculation") Campaign.Calculation calculationMethod,
                                 @JsonProperty("budget") Integer budget,
                                 @JsonProperty("weeks") Integer weeks) {
        this.name = name;
        this.productId = productId;
        this.calculationMethod = calculationMethod;
        this.budget = budget;
        this.weeks = weeks;

    }

    public Campaign asCompeign() {
        return Campaign.newCompeign(name, productId, calculationMethod, budget, weeks);
    }

}
