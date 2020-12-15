package com.gramant.campmodel.domain;

import java.util.UUID;

public class Сompany {

    private CompeignId id;
    private String name;
    private Product.ProductId productId;
    private Calculation calculationMethod;
    private Integer budget;
    private Integer weeks;

    public Сompany(CompeignId id, String name, Product.ProductId productId, Calculation calculationMethod, Integer budget, Integer weeks) {
        this.id = id;
        this.name = name;
        this.productId = productId;
        this.calculationMethod = calculationMethod;
        this.budget = budget;
        this.weeks = weeks;
    }

    public static Сompany newCompeign(String name, Product.ProductId productId, Calculation calculationMethod, Integer budget, Integer weeks) {
        return new Сompany(CompeignId.newId(), name, productId, calculationMethod, budget, weeks);
    }

    public enum Calculation {
        ATTRIBUTION, ECONOMETRIC, MIXED;
    }

    public static class CompeignId {
        UUID value;

        public CompeignId(String value) {
            this(UUID.fromString(value));
        }

        public CompeignId(UUID value) {
            this.value = value;
        }

        public static CompeignId newId() {
            return new CompeignId(UUID.randomUUID());
        }
    }
}

