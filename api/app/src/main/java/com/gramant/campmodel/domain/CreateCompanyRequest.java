package com.gramant.campmodel.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;


public class CreateCompanyRequest {

    private String name;
    private Product.ProductId productId;
    private Сompany.Calculation calculationMethod;
    private Integer budget;
    private Integer weeks;

    @JsonCreator
    public CreateCompanyRequest(@JsonProperty("name") String name,
                                @JsonProperty("productId") Product.ProductId productId,
                                @JsonProperty("calculation") Сompany.Calculation calculationMethod,
                                @JsonProperty("budget") Integer budget,
                                @JsonProperty("weeks") Integer weeks) {
        this.name = name;
        this.productId = productId;
        this.calculationMethod = calculationMethod;
        this.budget = budget;
        this.weeks = weeks;

    }

    public Сompany asCompeign() {
        return Сompany.newCompeign(name, productId, calculationMethod, budget, weeks);
    }

}
