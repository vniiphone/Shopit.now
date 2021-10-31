package com.shopit.now.demo.bean.views;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductView {
    private int id;
    private String title;
    private String category;
    private double price;
    private boolean trending;
    private int inStock;
}
