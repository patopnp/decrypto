package com.decrypto.ems.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class InvalidResourceOperationException extends RuntimeException{

    public InvalidResourceOperationException(String message) {
        super(message);
    }
}
