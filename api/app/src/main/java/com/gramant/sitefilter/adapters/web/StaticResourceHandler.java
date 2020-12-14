package com.gramant.sitefilter.adapters.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.nio.file.Path;

@Configuration
@EnableWebMvc
public class StaticResourceHandler implements WebMvcConfigurer {

    @Value("${app.vast-dir}")
    private String vastDirName;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            //.addResourceHandler("/**") // « /css/myStatic.css
            .addResourceHandler("/static/**") // « /static/css/myStatic.css
            .addResourceLocations("classpath:/static/"); // Default Static Loaction


        // File located on disk
        registry
            .addResourceHandler("/vast/**")
            .addResourceLocations("file:"+ vastDirName);

        File file = Path.of(vastDirName, "111/vast.xml").toFile();

    }
}
