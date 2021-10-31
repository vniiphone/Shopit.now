package com.shopit.now.demo.bean.views;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllProductDisplay {
    private int productCount;
    private List<ProductView> productViews;
}
