package com.gramant.campmodel.repository;

import com.gramant.campmodel.data.tables.records.CampaignRecord;
import com.gramant.campmodel.data.tables.records.ProductsRecord;
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
import static com.gramant.campmodel.data.tables.Products.PRODUCTS;

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


    private static Campaign map(Record record) {
        CampaignRecord campaignRecord = record.into(CAMPAIGN);
//        return new Campaign(
//                new Campaign.CampaignId(campaignRecord.getId()),
//                campaignRecord.getName(),
//                new Product.ProductId(campaignRecord.getProductId()),
//                campaignRecord.getCalculation(),
//                campaignRecord.getBudget(),
//                campaignRecord.getWeeks()
//        );
        return null;
    }

}
