package com.shopit.now.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopit.now.entity.CartDetails;

public interface CartRepository extends JpaRepository<CartDetails,Integer> {

}
