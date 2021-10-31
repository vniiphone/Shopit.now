package com.shopit.now.demo.bean.register;

import com.shopit.now.demo.bean.register.modules.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Registered_Users")
@Getter
@Setter
public class Register {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "Fullname",nullable = false)
    private String fullname;
    @Column(name="Email_Id",nullable = false,unique = true)
    private String email;
    @Column(name="Mobile_NO",nullable = false)
    private String mobile;
    @Column(name="Password",nullable = false)
    private String password;
    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true,mappedBy = "register")
    private User user;

}
