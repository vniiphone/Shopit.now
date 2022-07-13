package com.shopit.now.demo.jwtgenerator;

import com.shopit.now.demo.bean.register.UserRoles;
import com.shopit.now.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtClaims {

	@Autowired
	private UserRepository userRepository;

	protected List<String> userRoles(String username) {
		List<String> roles = new ArrayList<>();
		List<UserRoles> refactorRoles = userRepository.findByEmail(username).getUserRoles();
		for (UserRoles ur : refactorRoles)
			roles.add(ur.getRoles());
		return roles;
	}

	protected String getUsersName(String username) {
		return userRepository.findByEmail(username).getFullname();
	}

	protected int getId(String username) {
		return userRepository.findByEmail(username).getId();
	}

}
