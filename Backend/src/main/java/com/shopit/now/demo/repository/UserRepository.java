package com.shopit.now.demo.repository;

import com.shopit.now.demo.bean.register.modules.User;
import com.shopit.now.demo.bean.register.modules.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmail(String email);

	@Query("select count(u) from User u")
	int userCount();

	@Query("select u.fullname from User u where u.id=:uid")
	String getusername(@Param("uid") int uid);

	@Query("select count(u) from User u where u.email=:email_id")
	int findUserByMail(@Param("email_id") String email);

	@Query("select u from User u order by u.fullname asc ")
	List<User> getAllUsers();

	@Query("select u.cart from User u where u.id=:uid")
	List<CartDetails> getCartItems(@Param("uid") int uid);

}
