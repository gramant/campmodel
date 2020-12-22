package com.gramant.campmodel.domain;

import com.gramant.campmodel.domain.ids.CampaignId;
import com.gramant.campmodel.domain.ids.ProductCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class Campaign {

    private final CampaignId id;
    private final String name;
    private final ProductCode productCode;
    private final Calculation calculationMethod;
    private final Integer budget;
    private final Integer weeks;

    public Campaign(CampaignId id, String name, ProductCode productCode, Calculation calculationMethod, Integer budget, Integer weeks) {
        this.id = id;
        this.name = name;
        this.productCode = productCode;
        this.calculationMethod = calculationMethod;
        this.budget = budget;
        this.weeks = weeks;
    }

    public static Campaign newCampaign(String name, ProductCode productCode, Calculation calculationMethod, Integer budget, Integer weeks) {
        return new Campaign(CampaignId.newId(), name, productCode, calculationMethod, budget, weeks);
    }

}

