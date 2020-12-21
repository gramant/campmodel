package com.gramant.campmodel.repository;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.gramant.campmodel.data.tables.records.CampaignRecord;
import com.gramant.campmodel.domain.Campaign;
import com.gramant.campmodel.domain.Product;
import lombok.AllArgsConstructor;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

import static com.gramant.campmodel.data.tables.Campaign.CAMPAIGN;

@Repository
@AllArgsConstructor
public class CampaignRepository {

    private final DSLContext dsl;

    @Transactional(readOnly = true)
    public Optional<Campaign> getById(UUID id) {
        Optional<Record> record = dsl
                .select()
                .from(CAMPAIGN)
                .where(CAMPAIGN.ID.eq(id))
                .fetchOptional();
        return record.map(CampaignRepository::map);
    }

    @Transactional
    public void add(Campaign campaign) {
        dsl.insertInto(CAMPAIGN)
                .set(CampaignRepository.CampaignData.fromCampaign(campaign).asRecord())
                .execute();
    }

    private static Campaign map(Record record) {
        CampaignRecord campaignRecord = record.into(CAMPAIGN);
        return new Campaign(
                new Campaign.CampaignId(campaignRecord.getId()),
                campaignRecord.getName(),
                new Product.ProductId(campaignRecord.getProductId()),
                campaignRecord.getCalculation(),
                campaignRecord.getBudget(),
                campaignRecord.getWeeks()
        );
    }


    static class CampaignData {
        private UUID id;
        private String name;
        private UUID productId;
        private Campaign.Calculation calculationMethod;
        private Integer budget;
        private Integer weeks;

        @JsonCreator
        CampaignData(
                @JsonProperty("id") UUID id,
                @JsonProperty("name") String name,
                @JsonProperty("productId") UUID productId,
                @JsonProperty("calculation") Campaign.Calculation calculationMethod,
                @JsonProperty("budget") Integer budget,
                @JsonProperty("weeks") Integer weeks
                ){
            this.id = id;
            this.name = name;
            this.productId = productId;
            this.calculationMethod = calculationMethod;
            this.budget = budget;
            this.weeks = weeks;
        }

        public static CampaignRepository.CampaignData fromCampaign(Campaign campaign) {
            return new CampaignRepository.CampaignData
                    (
                            campaign.getId().getValue(),
                            campaign.getName(),
                            campaign.getProductId().getValue(),
                            campaign.getCalculationMethod(),
                            campaign.getBudget(),
                            campaign.getWeeks()
                    );
        }

        public Campaign asCampaign() {
            return new Campaign(new Campaign.CampaignId(id), name, new Product.ProductId(productId), calculationMethod, budget, weeks);
        }

        public CampaignRecord asRecord() {
            return new CampaignRecord()
                    .with(CAMPAIGN.ID, id)
                    .with(CAMPAIGN.NAME, name)
                    .with(CAMPAIGN.PRODUCT_ID, productId)
                    .with(CAMPAIGN.CALCULATION, calculationMethod)
                    .with(CAMPAIGN.BUDGET, budget)
                    .with(CAMPAIGN.WEEKS, weeks);
        }
    }


}
