package com.shopit.now.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AdminProductUpdate {
    private String title;
    private String price;
    private int stock;
    private boolean trending;
}
