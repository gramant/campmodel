package com.gramant.campmodel.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.gramant.campmodel.domain.ids.ProductCode;
import lombok.Getter;

@Getter
public class CreateCampaignRequest {

    private final String name;
    private final ProductCode productCode;
    private final String calculationMethod;
    private final Integer budget;
    private final Integer weeks;

    @JsonCreator
    public CreateCampaignRequest(@JsonProperty("name") String name,
                                 @JsonProperty("productCode") ProductCode productCode,
                                 @JsonProperty("calculation") String calculationMethod,
                                 @JsonProperty("budget") Integer budget,
                                 @JsonProperty("weeks") Integer weeks) {
        this.name = name;
        this.productCode = productCode;
        this.calculationMethod = calculationMethod;
        this.budget = budget;
        this.weeks = weeks;
    }

    public Campaign asCampaign() {
        return Campaign.newCampaign(name, productCode, Calculation.valueOf(calculationMethod), budget, weeks);
    }

}
