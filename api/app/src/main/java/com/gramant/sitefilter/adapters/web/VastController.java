package com.gramant.sitefilter.adapters.web;

import com.gramant.sitefilter.adapters.web.data.CreateVastRequest;
import com.gramant.sitefilter.app.GenerateVastService;
import com.gramant.sitefilter.adapters.web.data.FileNameRepresentation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.xpath.XPathExpressionException;
import java.io.IOException;

@Controller
@RequestMapping("/api/vast")
public class VastController {

    private final GenerateVastService generateVastService;

    public VastController(GenerateVastService generateVastService) {
        this.generateVastService = generateVastService;
    }

    @PostMapping
    public ResponseEntity<FileNameRepresentation> createVast(@RequestBody CreateVastRequest request)
            throws TransformerException, SAXException, ParserConfigurationException, XPathExpressionException, IOException{
        String vastFileName = generateVastService.createVast(request.getCompanyName(), request.getVastTag(), request.getMinWidth(), request.getMinHeight());
        return ResponseEntity.ok(new FileNameRepresentation(vastFileName));
    }
}
