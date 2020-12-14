package com.gramant.sitefilter.adapters.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/web/stats")
public class StatsController {

    @GetMapping("/{code}")
    public String stats(@PathVariable("code") String code, Model model) {
        model.addAttribute("filterName", code);
        return "stats";
    }
}
