package com.gramant.campmodel.repository;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.gramant.campmodel.data.tables.records.ProductsRecord;
import com.gramant.campmodel.domain.Product;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jooq.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.gramant.campmodel.data.tables.Products.PRODUCTS;

@Repository
@AllArgsConstructor
@Slf4j
public class ProductRepository {

    private final DSLContext dsl;

    @Transactional(readOnly = true)
    public Optional<Product> getByName(String name) {
        Optional<Record> record = dsl
                .select()
                .from(PRODUCTS)
                .where(PRODUCTS.NAME.eq(name))
                .fetchOptional();
        return record.map(ProductRepository::map);
    }

    @Transactional(readOnly = true)
    public Optional<Product> getById(UUID code) {
        Optional<Record> record = dsl
                .select()
                .from(PRODUCTS)
                .where(PRODUCTS.CODE.eq(code))
                .fetchOptional();
        return record.map(ProductRepository::map);
    }

    @Transactional(readOnly = true)
    public List<Product> list() {
        return dsl.select().from(PRODUCTS).fetch().map(ProductRepository::map);
    }

    @Transactional
    public void add(Product product) {
        dsl.insertInto(PRODUCTS)
                .set(ProductData.fromProduct(product).asRecord())
                .execute();
    }

    @Transactional
    public void update(Product product) {
        dsl.update(PRODUCTS)
                .set(ProductData.fromProduct(product).asRecord())
                .where(PRODUCTS.CODE.eq(product.getProductId().getValue()))
                .execute();
    }

    @Transactional
    public void remove(Product.ProductId id) {
        dsl.deleteFrom(PRODUCTS)
                .where(PRODUCTS.CODE.eq(id.getValue()))
                .execute();
    }

    public static Product map(Record record) {
        ProductsRecord productsRecord = record.into(PRODUCTS);
        return new Product(new Product.ProductId(productsRecord.getCode()), productsRecord.getName());
    }

    static class ProductData {
        private final UUID code;
        private final String name;

        @JsonCreator
        ProductData(@JsonProperty("code") UUID code, @JsonProperty("name") String name){
            this.code = code;
            this.name = name;
        }

        public static ProductData fromProduct(Product product) {
            return new ProductData(product.getProductId().getValue(), product.getName());
        }

        public Product asProduct() {
            return new Product(new Product.ProductId(code), name);
        }

        public ProductsRecord asRecord() {
            return new ProductsRecord()
                    .with(PRODUCTS.CODE, code)
                    .with(PRODUCTS.NAME, name);
        }
    }

}
