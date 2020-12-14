package com.gramant.sitefilter.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gramant.sitefilter.domain.AdParameters;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.w3c.dom.CDATASection;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.*;
import java.nio.file.Paths;

@Slf4j
@Service
public class GenerateVastService {

    private final AdParametersBuilderService adParametersBuilderService;

    @Value("${app.baseUrl}")
    private String baseUrl;

    @Value("${app.vast-dir}")
    private String vastDirName;

    public GenerateVastService(AdParametersBuilderService adParametersBuilderService) {
        this.adParametersBuilderService = adParametersBuilderService;
    }

    public String createVast(String companyName, String vastTag, Integer minWidth, Integer minHeight)
            throws TransformerException, SAXException, ParserConfigurationException, XPathExpressionException, IOException {
        File vastDir = new File(vastDirName);

        if (!vastDir.exists()) {
            if (!vastDir.mkdirs()) {
                throw new IllegalStateException("Directories with path '" + vastDirName + "' was not created");
            }
        }

        if (!vastDir.isDirectory()) {
            throw new IllegalStateException("File '" + vastDirName + "' not directory");
        }

        String updatedCompanyName =  companyName.replace(" ", "-");

        File companyDir = Paths.get(vastDir.getAbsolutePath(), updatedCompanyName).toFile();
        if (!companyDir.exists()) {
            if (!companyDir.mkdirs()) {
                throw new IllegalStateException("Directories with path '" + companyDir + "' was not created");
            }
        }

        String nameVastFile = "vast.xml";

        File vastFile = Paths.get(companyDir.getAbsolutePath(), nameVastFile).toFile();

        OutputStream outputStream = generateVast(vastTag, updatedCompanyName,minWidth, minHeight);

        FileOutputStream fileOutputStream = new FileOutputStream(vastFile);

        ((ByteArrayOutputStream) outputStream).writeTo(fileOutputStream);

        fileOutputStream.close();

        return baseUrl.concat("/ads/vast/"+companyName.replace(" ", "-") + "/" + nameVastFile);
    }

    public OutputStream generateVast(String vastTag, String companyName, Integer minWidth, Integer minHeight)
            throws TransformerException, SAXException, ParserConfigurationException, XPathExpressionException, IOException {
        try {
            InputStream inputStream = new ClassPathResource("templates/vastWithPlayerTemplate.xml").getInputStream();

            Document vastDocument = null;

            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();

            vastDocument = builder.parse(inputStream);

            // update AdParameters
            NodeList adParametersList = vastDocument.getElementsByTagName("AdParameters");

            if (adParametersList.getLength() != 1) {
                throw new IllegalStateException("Vast template wrong");
            }

            ObjectMapper objectMapper = new ObjectMapper();

            Node adParametersNode = adParametersList.item(0);

            adParametersNode.setTextContent(objectMapper.writeValueAsString(
                    adParametersBuilderService.create(vastTag, companyName, minWidth, minHeight)));

            //update MediaFile vpaid
            CDATASection cdataSection = vastDocument.createCDATASection(baseUrl + "/static/vpaid.js");

            XPath xPath = XPathFactory.newInstance().newXPath();
            Node vpaidNode = (Node) xPath.evaluate("//*[@id='vpaid']", vastDocument, XPathConstants.NODE);
            vpaidNode.appendChild(cdataSection);

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            OutputStream outputStream = new ByteArrayOutputStream();
            DOMSource source = new DOMSource(vastDocument);
            StreamResult result = new StreamResult(outputStream);
            transformer.transform(source, result);

            return outputStream;
        } catch (TransformerException | SAXException | ParserConfigurationException | XPathExpressionException e) {
            log.error("Error when generate vast", e);
            throw e;
        }
    }
}
