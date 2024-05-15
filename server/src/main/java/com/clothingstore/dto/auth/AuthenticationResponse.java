package com.clothingstore.dto.auth;

import com.clothingstore.dto.user.UserResponse;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserResponse user;
    private String token;
}
