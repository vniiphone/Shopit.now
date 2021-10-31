package com.shopit.now.demo.bean.views;

import com.shopit.now.demo.bean.products.images.Thumbnail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class View {
    private int id;
    private String title;
    private double price;
    private Thumbnail thumbnail;
}
