package com.shopit.now.demo.repository;

import com.shopit.now.demo.bean.register.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface RegisterUserRepository extends JpaRepository<Register,Integer> {

    Register findByEmail(String email);

    @Query("select r.fullname from Register r where r.id=:uid")
    String getusername(@Param("uid") int uid);

}
