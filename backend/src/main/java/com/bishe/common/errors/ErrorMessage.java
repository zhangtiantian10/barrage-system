package com.bishe.common.errors;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
public class ErrorMessage {
    private int code;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getDetails() {
        return details;
    }

    public void setDetails(Map<String, Object> details) {
        this.details = details;
    }

    private String message;

    private Map<String, Object> details;

    public ErrorMessage(int code, String message) {
        this.code = code;
        this.message = message;
        this.details = new HashMap<>();
    }

    public <T> ErrorMessage withDetails(String key, T value) {
        details.put(key, value);
        return this;
    }
}
