package com.bishe.common.exceptions;

import com.bishe.common.errors.ErrorCode;
import lombok.Getter;

public class HttpException extends RuntimeException {
    @Getter
    private ErrorCode errorCode;

    public HttpException(ErrorCode code, String message) {
        super(message);
        this.errorCode = code;
    }

    public HttpException(ErrorCode code, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = code;
    }

    public HttpException(ErrorCode code) {
        this(code, code.getMessage());
    }
}
