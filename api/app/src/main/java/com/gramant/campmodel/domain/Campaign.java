package com.gramant.campmodel.domain;

import java.util.UUID;

public class Campaign {

    private CampaignId id;
    private String name;
    private Product.ProductId productId;
    private Calculation calculationMethod;
    private Integer budget;
    private Integer weeks;

    public Campaign(CampaignId id, String name, Product.ProductId productId, Calculation calculationMethod, Integer budget, Integer weeks) {
        this.id = id;
        this.name = name;
        this.productId = productId;
        this.calculationMethod = calculationMethod;
        this.budget = budget;
        this.weeks = weeks;
    }

    public static Campaign newCompeign(String name, Product.ProductId productId, Calculation calculationMethod, Integer budget, Integer weeks) {
        return new Campaign(CampaignId.newId(), name, productId, calculationMethod, budget, weeks);
    }

    public enum Calculation {
        ATTRIBUTION, ECONOMETRIC, MIXED;
    }

    public static class CampaignId {
        UUID value;

        public CampaignId(String value) {
            this(UUID.fromString(value));
        }

        public CampaignId(UUID value) {
            this.value = value;
        }

        public static CampaignId newId() {
            return new CampaignId(UUID.randomUUID());
        }
    }
}

