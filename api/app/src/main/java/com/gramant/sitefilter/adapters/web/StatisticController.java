package com.gramant.sitefilter.adapters.web;

import com.gramant.sitefilter.adapters.dbstats.JdbcStatsQuery;
import com.gramant.sitefilter.adapters.web.data.CreateVastRequest;
import com.gramant.sitefilter.adapters.web.data.FileNameRepresentation;
import com.gramant.sitefilter.adapters.web.data.FilterStatsRepresentation;
import com.gramant.sitefilter.app.GenerateVastService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPathExpressionException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/statistic")
@RequiredArgsConstructor
public class StatisticController {

    private final JdbcStatsQuery statsQuery;

    @GetMapping
    public ResponseEntity<List<FilterStatsRepresentation>> createVast() {
        return ResponseEntity.ok(statsQuery.stats().stream().map(FilterStatsRepresentation::from).collect(Collectors.toList()));
    }
}
