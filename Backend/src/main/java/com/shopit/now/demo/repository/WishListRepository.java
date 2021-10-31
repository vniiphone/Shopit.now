package com.shopit.now.demo.repository;

import com.shopit.now.demo.bean.register.modules.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<Wishlist,Integer> {

    void deleteByIdAndUser_Id(int id,int userId);

    void deleteByProductIdAndUser_Id(int id,int userId);

    Wishlist findByProductIdAndUser_Id(int productId,int userId);

}
