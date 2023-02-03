package com.shopit.now.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopit.now.entity.UserProfileImage;

public interface ProfileImageRepository extends JpaRepository<UserProfileImage,Integer> {

}
