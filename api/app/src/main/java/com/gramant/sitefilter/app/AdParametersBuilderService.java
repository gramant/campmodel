package com.gramant.sitefilter.app;

import com.gramant.sitefilter.domain.AdParameters;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AdParametersBuilderService {

    @Value("${app.baseUrl}")
    private String baseUrl;

    @Value("${app.ad-impression-url}")
    private String adImpressionUrl;

    @Value("${app.ad-check-before-load-wrong-size-url}")
    private String adCheckBeforeLoadWrongSizeUrl;

    public AdParameters create(String vastTag,
                               String companyName,
                               Integer minWidth,
                               Integer minHeight
    ) {
        return new AdParameters(baseUrl, vastTag, minWidth, minHeight,
                adImpressionUrl.concat("/" + companyName),
                adCheckBeforeLoadWrongSizeUrl.concat("/" + companyName + "/errors"));
    }
}
