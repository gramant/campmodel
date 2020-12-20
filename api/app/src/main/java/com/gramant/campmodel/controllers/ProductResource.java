package com.gramant.campmodel.controllers;

import com.gramant.campmodel.domain.CreateProductRequest;
import com.gramant.campmodel.domain.Product;
import com.gramant.campmodel.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
@AllArgsConstructor
@Validated
@Slf4j
public class ProductResource {

    private final ProductRepository productRepository;

    @PostMapping ()
    public ResponseEntity<?> addProduct(@RequestBody CreateProductRequest req) {
        Product newProduct = req.asProduct();
        if (productRepository.getByName(req.getName()).isPresent()) {
            return ResponseEntity.unprocessableEntity().body("Product with name [" + req.getName() + "] already exists!");
        }

        productRepository.add(newProduct);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
