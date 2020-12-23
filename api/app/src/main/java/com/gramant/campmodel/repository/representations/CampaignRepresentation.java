package com.gramant.campmodel.repository.representations;

import com.gramant.campmodel.domain.Campaign;
import com.gramant.campmodel.domain.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@Getter
public class CampaignRepresentation {

    private final String id;
    private final String name;
    private final String productCode;
    private final String calculationMethod;
    private final Integer budget;
    private final Integer weeks;


    public static CampaignRepresentation from(Campaign campaign){
        return new CampaignRepresentation(
                campaign.getId().getValue().toString(),
                campaign.getName(),
                campaign.getProductCode().getValue().toString(),
                campaign.getCalculationMethod().toString(),
                campaign.getBudget(),
                campaign.getWeeks()
        );
    }

}
