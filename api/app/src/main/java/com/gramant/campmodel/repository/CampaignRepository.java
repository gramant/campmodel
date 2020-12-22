package com.gramant.campmodel.repository;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.gramant.campmodel.data.tables.records.CampaignRecord;
import com.gramant.campmodel.domain.Campaign;
import com.gramant.campmodel.domain.ids.CampaignId;
import com.gramant.campmodel.domain.ids.ProductCode;
import lombok.AllArgsConstructor;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.gramant.campmodel.data.tables.Campaign.CAMPAIGN;

@Repository
@AllArgsConstructor
public class CampaignRepository {

    private final DSLContext dsl;

    @Transactional(readOnly = true)
    public Optional<Campaign> getById(CampaignId id) {
        Optional<Record> record = dsl
                .select()
                .from(CAMPAIGN)
                .where(CAMPAIGN.ID.eq(id.getValue()))
                .fetchOptional();
        return record.map(CampaignRepository::map);
    }

    @Transactional(readOnly = true)
    public Optional<Campaign> getByName(String name) {
        Optional<Record> record = dsl
                .select()
                .from(CAMPAIGN)
                .where(CAMPAIGN.NAME.eq(name))
                .fetchOptional();
        return record.map(CampaignRepository::map);
    }

    @Transactional
    public void remove(UUID id) {
        dsl.deleteFrom(CAMPAIGN)
                .where(CAMPAIGN.ID.eq(id))
                .execute();
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
                new CampaignId(campaignRecord.getId()),
                campaignRecord.getName(),
                new ProductCode(campaignRecord.getProductCode()),
                campaignRecord.getCalculation(),
                campaignRecord.getBudget(),
                campaignRecord.getWeeks()
        );
    }

    @Transactional
    public void update(Campaign campaign) {
        dsl.update(CAMPAIGN)
                .set(CampaignRepository.CampaignData.fromCampaign(campaign).asRecord())
                .where(CAMPAIGN.ID.eq(campaign.getId().getValue()))
                .execute();
    }

    public List<Campaign> list() {
        return dsl.select().from(CAMPAIGN).fetch().map(CampaignRepository::map);
    }

    static class CampaignData {
        private final UUID id;
        private final String name;
        private final UUID productCode;
        private final Campaign.Calculation calculationMethod;
        private final Integer budget;
        private final Integer weeks;

        CampaignData(UUID id, String name, UUID productCode,
                     Campaign.Calculation calculationMethod,
                     Integer budget, Integer weeks
        ){
            this.id = id;
            this.name = name;
            this.productCode = productCode;
            this.calculationMethod = calculationMethod;
            this.budget = budget;
            this.weeks = weeks;
        }

        public static CampaignRepository.CampaignData fromCampaign(Campaign campaign) {
            return new CampaignRepository.CampaignData
                    (
                            campaign.getId().getValue(),
                            campaign.getName(),
                            campaign.getProductCode().getValue(),
                            campaign.getCalculationMethod(),
                            campaign.getBudget(),
                            campaign.getWeeks()
                    );
        }

        public Campaign asCampaign() {
            return new Campaign(new CampaignId(id), name, new ProductCode(productCode), calculationMethod, budget, weeks);
        }

        public CampaignRecord asRecord() {
            return new CampaignRecord()
                    .with(CAMPAIGN.ID, id)
                    .with(CAMPAIGN.NAME, name)
                    .with(CAMPAIGN.PRODUCT_CODE, productCode)
                    .with(CAMPAIGN.CALCULATION, calculationMethod)
                    .with(CAMPAIGN.BUDGET, budget)
                    .with(CAMPAIGN.WEEKS, weeks);
        }
    }
}
