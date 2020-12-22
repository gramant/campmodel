package com.gramant.campmodel.domain.ids;

import lombok.Value;

import java.util.UUID;

@Value
public class ProductCode {
    UUID value;

    public ProductCode(String value) {
        this(UUID.fromString(value));
    }

    public ProductCode(UUID value) {
        this.value = value;
    }

    public static ProductCode newCode() {
        return new ProductCode(UUID.randomUUID());
    }
}
