package com.clothingstore.controller;

import com.clothingstore.consts.PathConstants;
import com.clothingstore.dto.cloth.ClothResponse;
import com.clothingstore.dto.user.UpdateUserRequest;
import com.clothingstore.dto.user.UserResponse;
import com.clothingstore.dto.mapper.UserMapper;
import com.clothingstore.configurations.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.clothingstore.consts.PathConstants.CART;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.API_V1_USERS)
public class UserController {

    private final UserMapper userMapper;
//    private final GraphQLProvider graphQLProvider;

    @GetMapping
    public ResponseEntity<UserResponse> getUserInfo(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(userMapper.getUserInfo(user.getEmail()));
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateUserInfo(@AuthenticationPrincipal UserPrincipal user,
                                                       @Valid @RequestBody UpdateUserRequest request,
                                                       BindingResult bindingResult) {
        return ResponseEntity.ok(userMapper.updateUserInfo(user.getEmail(), request, bindingResult));
    }

    @PostMapping(CART)
    public ResponseEntity<List<ClothResponse>> getCart(@RequestBody List<Long> clothIds) {
        return ResponseEntity.ok(userMapper.getCart(clothIds));
    }

//    @PostMapping(GRAPHQL)
//    public ResponseEntity<ExecutionResult> getUserInfoByQuery(@RequestBody GraphQLRequest request) {
//        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
//    }
}
