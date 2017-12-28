package com.bishe.common.exceptions;

import com.bishe.common.errors.ErrorCode;
import lombok.Getter;

public class HttpException extends RuntimeException {
    private ErrorCode errorCode;

    public ErrorCode getErrorCode() {
        return errorCode;
    }

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
