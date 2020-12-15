package com.gramant.campmodel.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.UUID;

@Getter
@ToString
@EqualsAndHashCode(of = {"productId"})
public class Product {

    private Product.ProductId productId;
    private String name;

    public Product(ProductId productId, String name) {
        this.productId = productId;
        this.name = name;
    }

    public static Product newProduct(String name) {
        return new Product(ProductId.newId(), name);
    }

    @Getter
    public static class ProductId {
        UUID value;

        public ProductId(String value) {
            this(UUID.fromString(value));
        }

        public ProductId(UUID value) {
            this.value = value;
        }

        public static Product.ProductId newId() {
            return new Product.ProductId(UUID.randomUUID());
        }
    }
}
