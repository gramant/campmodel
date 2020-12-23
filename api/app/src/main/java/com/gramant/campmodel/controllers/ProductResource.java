package com.gramant.campmodel.controllers;

import com.gramant.campmodel.domain.CreateProductRequest;
import com.gramant.campmodel.domain.Product;
import com.gramant.campmodel.domain.ids.ProductCode;
import com.gramant.campmodel.repository.ProductRepository;
import com.gramant.campmodel.repository.representations.ProductRepresentation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@AllArgsConstructor
@Validated
@Slf4j
public class ProductResource {

    private final ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody CreateProductRequest req) {
        if (productRepository.getByName(req.getName()).isPresent()) {
            return ResponseEntity.unprocessableEntity().body("Product with name [" + req.getName() + "] already exists!");
        }

        productRepository.add(req.asProduct());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductRepresentation> getProduct(@PathVariable("id") ProductCode code) {
        return productRepository.getById(code)
                .map(product -> ResponseEntity.ok(ProductRepresentation.from(product)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<ProductRepresentation> list() {
        return productRepository.list().stream().map(ProductRepresentation::from).collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeProduct(@PathVariable("id") ProductCode code) {
        if (productRepository.getById(code).isPresent()) {
            productRepository.remove(code);
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replaceProduct(@PathVariable("id") ProductCode code,
                                                              @RequestBody CreateProductRequest req) {
        // check that there is an item with the specified ID to be updated
        if (productRepository.getById(code).isEmpty()) {
            return ResponseEntity.unprocessableEntity().body("Product with code [" + code + "] does not exist!");
        }

        Product product = new Product(code, req.getName());
        productRepository.update(product);
        return ResponseEntity.noContent().build();

    }

}
