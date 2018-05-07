package com.bishe.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequestMapping(value = "/image")
public class ImageController {
    @Value("${zt.upload-path}")
    private String webUploadPath;

    private final ResourceLoader resourceLoader;

    public ImageController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @RequestMapping(value = "/{fileName:.+}", method = RequestMethod.GET)
    public ResponseEntity getImage(@PathVariable String fileName) {
        File currentFile = new File(".");
        String currentPath = currentFile.getAbsolutePath();

        String temp = "static/images" + File.separator + "upload" + File.separator;
        Resource resource = resourceLoader.getResource("file:" + currentPath + webUploadPath + temp + fileName);

        return ResponseEntity.ok(resource);
    }
}
