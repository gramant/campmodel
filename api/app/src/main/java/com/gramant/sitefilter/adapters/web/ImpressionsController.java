package com.gramant.sitefilter.adapters.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/creatives/view")
public class ImpressionsController {

    @GetMapping
    public void view() {
        System.out.println("Impression registered");
    }
}
