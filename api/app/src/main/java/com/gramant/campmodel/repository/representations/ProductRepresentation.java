package com.gramant.campmodel.repository.representations;

import com.gramant.campmodel.domain.Product;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class ProductRepresentation {
    private final String code;
    private final String name;

    public static ProductRepresentation from(Product product){
        return new ProductRepresentation(
                product.getCode().getValue().toString(),
                product.getName()
        );
    }
}
