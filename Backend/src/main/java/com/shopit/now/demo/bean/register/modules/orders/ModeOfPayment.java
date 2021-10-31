package com.shopit.now.demo.bean.register.modules.orders;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Getter
@Setter
public class ModeOfPayment {
    private String modeOfPayment;
}
