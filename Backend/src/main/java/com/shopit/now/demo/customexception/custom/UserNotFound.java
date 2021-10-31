package com.shopit.now.demo.customexception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserNotFound extends Exception {
    private static final long serialVersionUID = 1L;

    public UserNotFound(String message) {
        super(message);
    }
}