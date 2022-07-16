package com.shopit.now.customexception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InvalidCredentials extends Exception {
    private static final long serialVersionUID = 1L;

    public InvalidCredentials(String message) {
        super(message);
    }
}