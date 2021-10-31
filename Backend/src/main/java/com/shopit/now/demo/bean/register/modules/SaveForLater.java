package com.shopit.now.demo.bean.register.modules;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "Save_For_Later")
public class SaveForLater {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "product_id")
    private int productId;
    private String productName;
    private String totalPrice;
    private int itemCount;
}
