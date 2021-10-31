package com.shopit.now.demo.bean.views;

import com.shopit.now.demo.bean.register.modules.UserProfileImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserView {
    private int id;
    private String name;
    private String email;
    private UserProfileImage userProfileImage;
}
