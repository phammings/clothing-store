package com.clothingstore.service;

import com.clothingstore.entity.Cloth;
import com.clothingstore.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    User getUserInfo(String email);
    User getUserById(Long userId);
    Page<User> getAllUsers(Pageable pageable);
    List<Cloth> getCart(List<Long> clothIds);
    User updateUserInfo(String email, User user);

}
