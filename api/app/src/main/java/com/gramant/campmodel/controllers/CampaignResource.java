package com.gramant.campmodel.controllers;

import com.gramant.campmodel.domain.Campaign;
import com.gramant.campmodel.domain.CreateCampaignRequest;
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
public class CampaignResource {

    @PostMapping
    public ResponseEntity<?> addFilter(@RequestBody CreateCampaignRequest req) {

        Campaign newCampaign = req.asCompeign();
        return null;
    }

}
