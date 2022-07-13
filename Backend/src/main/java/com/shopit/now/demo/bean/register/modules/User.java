package com.shopit.now.demo.bean.register.modules;

import com.shopit.now.demo.bean.register.Register;
import com.shopit.now.demo.bean.register.UserRoles;
import com.shopit.now.demo.bean.register.modules.orders.Orders;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@Table(name = "Users")
@Entity
public class User extends Register {

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.LAZY)
	private UserProfileImage userProfileImage;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private List<UserRoles> userRoles;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id")
	private List<Address> address;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	private List<Orders> orders;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id")
	private List<CartDetails> cart;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id")
	private List<SaveForLater> saveForLater;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Wishlist> wishlist;
}
