package com.shopit.now.demo.bean.products;

import com.shopit.now.demo.bean.products.images.Productimage;
import com.shopit.now.demo.bean.products.images.Thumbnail;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private Double price;
    private String category;
    private int inStock;
    private boolean trending;
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Thumbnail thumbnail;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    @MapsId
    private ProductRatings productRatings;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name="product_id")
    private List<Productimage> productimage;
}
