package com.bishe;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/api")
public class Try {
    @RequestMapping(value = "/try")
    public ResponseEntity sendMessage(){
        Map<String, String> body = new HashMap<>();
        body.put("value", "hello");

        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }
}
