package com.shopit.now.customexception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class GlobalServerException extends Exception {
    private static final long serialVersionUID = 1L;

    public GlobalServerException(String message) {
        super(message);
    }
}