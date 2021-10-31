package com.shopit.now.demo.repository;

import com.shopit.now.demo.bean.register.modules.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartDetails,Integer> {

}
