package com.gramant.campmodel.controllers;

import com.gramant.campmodel.domain.Сompany;
import com.gramant.campmodel.domain.CreateCompanyRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/compeign")
@AllArgsConstructor
@Validated
public class CompeignResource {

    @PostMapping
    public ResponseEntity<?> addFilter(@RequestBody CreateCompanyRequest req) {

        Сompany newСompany = req.asCompeign();
        return null;
    }

}
