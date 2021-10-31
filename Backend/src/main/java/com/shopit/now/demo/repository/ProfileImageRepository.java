package com.shopit.now.demo.repository;

import com.shopit.now.demo.bean.register.modules.UserProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImageRepository extends JpaRepository<UserProfileImage,Integer> {

}
