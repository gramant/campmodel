package com.gramant.campmodel.domain.ids;

import lombok.Value;

import java.util.UUID;

@Value
public class CampaignId {
    UUID value;

    public CampaignId(String value) {
        this(UUID.fromString(value));
    }

    public CampaignId(UUID value) {
        this.value = value;
    }

    public static CampaignId newId() {
        return new CampaignId(UUID.randomUUID());
    }
}
