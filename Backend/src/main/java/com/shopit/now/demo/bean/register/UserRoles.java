package com.shopit.now.demo.bean.register;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class UserRoles {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;
    private String roles;

}
