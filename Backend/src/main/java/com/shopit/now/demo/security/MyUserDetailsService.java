package com.shopit.now.demo.security;

import com.shopit.now.demo.bean.register.modules.User;
import com.shopit.now.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		if (user == null)
			throw new UsernameNotFoundException("Username not found");
		Collection<? extends GrantedAuthority> roles = user.getUserRoles().stream().map(role -> role.getRoles())
				.map(role -> new SimpleGrantedAuthority("ROLE_" + role)).collect(Collectors.toList());
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), roles);
	}
}
