package com.bishe.common.exceptions;

import com.bishe.common.errors.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends HttpException {
    public NotFoundException(ErrorCode code) {
        super(code);
    }

    public NotFoundException(ErrorCode code, String message) {
        super(code, message);
    }
}
