package com.gramant.campmodel.repository.jooqConfig;

import com.gramant.campmodel.domain.Calculation;
import org.jooq.Converter;

public class StringToCalculationConverter implements Converter<String, Calculation> {

    @Override
    public Calculation from(String databaseObject) {
        return Calculation.valueOf(databaseObject);
    }

    @Override
    public String to(Calculation userObject) {
        return String.valueOf(userObject);
    }

    @Override
    public Class<String> fromType() {
        return String.class;
    }

    @Override
    public Class<Calculation> toType() {
        return Calculation.class;
    }
}
