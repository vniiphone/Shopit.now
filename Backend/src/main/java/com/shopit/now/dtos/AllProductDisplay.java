package com.shopit.now.dtos;

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
