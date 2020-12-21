package com.gramant.campmodel.repository.jooqConfig;

import com.gramant.campmodel.domain.Campaign;
import org.jooq.Converter;

public class StringToCalculationConverter implements Converter<String, Campaign.Calculation> {

    @Override
    public Campaign.Calculation from(String databaseObject) {
        return Campaign.Calculation.valueOf(databaseObject);
    }

    @Override
    public String to(Campaign.Calculation userObject) {
        return String.valueOf(userObject);
    }

    @Override
    public Class<String> fromType() {
        return String.class;
    }

    @Override
    public Class<Campaign.Calculation> toType() {
        return Campaign.Calculation.class;
    }
}
