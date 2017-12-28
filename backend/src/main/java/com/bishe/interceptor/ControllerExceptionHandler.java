package com.bishe.interceptor;

import com.bishe.common.errors.ErrorCode;
import com.bishe.common.errors.ErrorMessage;
import com.bishe.common.exceptions.BadRequestException;
import com.bishe.common.exceptions.HttpException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorMessage handleHttpClientError(MethodArgumentNotValidException ex) {
        // TODO: 07/11/2017 check if we need to make the error response so detailed.
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();
        if (errors.size() == 1 && ErrorCode.contains(errors.get(0).getCode())) {
            ErrorCode errorCode = ErrorCode.valueOf(errors.get(0).getCode());
//            log.info("invalid request with error code: {}", errorCode);
            return errorCode.toErrorMessage();
        } else {
//            log.info("invalid request with errors: {}", errors);
            return ErrorCode.INVALID_REQUEST.toErrorMessage().withDetails("errors", errors);
        }
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ErrorMessage handleAccessDeniedException(AccessDeniedException ex) {
        return ErrorCode.FORBIDDEN.toErrorMessage();
    }

    @ExceptionHandler(HttpException.class)
    @ResponseBody
    public ResponseEntity handleHttpException(HttpException ex) {
        ResponseStatus responseStatus = ex.getClass().getDeclaredAnnotation(ResponseStatus.class);
        ErrorMessage errorMessage = new ErrorMessage(ex.getErrorCode().getCode(), ex.getMessage());
        ResponseEntity result = new ResponseEntity(errorMessage, responseStatus.value());
        return result;
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorMessage(ErrorCode.SERVER_ERROR.getCode(), ex.getMessage()));
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseBody
    public ResponseEntity handleBadRequestException(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessage(ex.getErrorCode().getCode(), ex.getErrorCode().getMessage()));
    }
}
