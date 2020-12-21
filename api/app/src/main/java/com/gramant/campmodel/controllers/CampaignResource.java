package com.gramant.campmodel.controllers;

import com.gramant.campmodel.domain.Campaign;
import com.gramant.campmodel.domain.CreateCampaignRequest;
import com.gramant.campmodel.domain.CreateProductRequest;
import com.gramant.campmodel.repository.CampaignRepository;
import com.gramant.campmodel.repository.ProductRepository;
import com.gramant.campmodel.repository.representations.CampaignRepresentation;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/api/campaign")
@AllArgsConstructor
public class CampaignResource {

    private final CampaignRepository campaignRepository;
    private final ProductRepository productRepository;

    @PostMapping("/")
    public ResponseEntity<?> addCampaign(@RequestBody CreateCampaignRequest req) {

        if (campaignRepository.getByName(req.getName()).isPresent()) {
            return ResponseEntity.unprocessableEntity().body("Campaign with name [" + req.getName() + "] already exists!");
        }

        if (productRepository.getById(req.getProductId().getValue()).isEmpty()) {
            return ResponseEntity.unprocessableEntity().body("Product with code [" + req.getProductId().getValue() + "] does not exist!");
        }

        if (!EnumUtils.isValidEnum(Campaign.Calculation.class, req.getCalculationMethod())) {
            return ResponseEntity.unprocessableEntity().body("Calculation method [" + req.getCalculationMethod() + "] is not provided!");
        }

        campaignRepository.add(req.asCompeign());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignRepresentation> getCampaign(@PathVariable("id") UUID id) {
        return campaignRepository.getById(id)
                .map(campaign -> ResponseEntity.ok(CampaignRepresentation.from(campaign)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeCampaign(@PathVariable("id") UUID id) {
        if (campaignRepository.getById(id).isPresent()) {
            campaignRepository.remove(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replaceFilter(@PathVariable("id") UUID id,
                                           @RequestBody CreateCampaignRequest req) {

        if (campaignRepository.getById(id).isEmpty()) {
            return ResponseEntity.unprocessableEntity().body("Campaign with id [" + id + "] does not exist!");
        }

        if (productRepository.getById(req.getProductId().getValue()).isEmpty()) {
            return ResponseEntity.unprocessableEntity().body("Product with code [" + req.getProductId().getValue() + "] does not exist!");
        }

        if (!EnumUtils.isValidEnum(Campaign.Calculation.class, req.getCalculationMethod())) {
            return ResponseEntity.unprocessableEntity().body("Calculation method [" + req.getCalculationMethod() + "] is not provided!");
        }

        Campaign campaign = new Campaign(
                new Campaign.CampaignId(id),
                req.getName(), req.getProductId(),
                Campaign.Calculation.valueOf(req.getCalculationMethod()),
                req.getBudget(),
                req.getWeeks());

        campaignRepository.update(campaign);

        return ResponseEntity.noContent().build();
    }

}
