package com.gramant.campmodel.controllers;

import com.gramant.campmodel.domain.CreateProductRequest;
import com.gramant.campmodel.domain.Product;
import com.gramant.campmodel.repository.ProductRepository;
import com.gramant.campmodel.repository.representations.ProductRepresentation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
@Validated
@Slf4j
public class ProductResource {

    private final ProductRepository productRepository;

    @PostMapping ("/")
    public ResponseEntity<?> addProduct(@RequestBody CreateProductRequest req) {
        Product newProduct = req.asProduct();
        if (productRepository.getByName(req.getName()).isPresent()) {
            return ResponseEntity.unprocessableEntity().body("Product with name [" + req.getName() + "] already exists!");
        }

        productRepository.add(newProduct);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductRepresentation> getProduct(@PathVariable("id") UUID id) {
        return productRepository.getById(id)
                .map(product -> ResponseEntity.ok(ProductRepresentation.from(product)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/")
    public List<ProductRepresentation> list() {
        return productRepository.list().stream().map(ProductRepresentation::from).collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeProduct(@PathVariable("id") UUID id) {
        if (productRepository.getById(id).isPresent()) {
            productRepository.remove(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replaceFilter(@PathVariable("id") UUID id,
                                                              @RequestBody CreateProductRequest req) {
        // check that there is an item with the specified ID
        if (productRepository.getById(id).isEmpty()) {
            return ResponseEntity.unprocessableEntity().body("Product with id [" + id + "] does not exist!");
        }

        //check that the name of the item will not be duplicated after the update
        if (productRepository.getByName(req.getName()).isPresent()) {
            if (productRepository.getByName(req.getName()).get().getProductId().getValue() != id) {
                return ResponseEntity.unprocessableEntity().body(
                        "Product with name [" + req.getName() + "] already exist with code ["
                                + productRepository.getByName(req.getName()).get().getProductId().getValue()
                                + "]");
            }
        }

        Product product = new Product(new Product.ProductId (id), req.getName());

        productRepository.update(product);

        return ResponseEntity.noContent().build();
    }

}
