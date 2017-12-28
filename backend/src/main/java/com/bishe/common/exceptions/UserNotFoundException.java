package com.bishe.common.exceptions;

import com.bishe.common.errors.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserNotFoundException extends HttpException {
    public UserNotFoundException(ErrorCode code, String message) {
        super(code, message);
    }

    public UserNotFoundException(ErrorCode code, String message, Throwable cause) {
        super(code, message, cause);
    }

    public UserNotFoundException(ErrorCode code) {
        super(code);
    }

}
