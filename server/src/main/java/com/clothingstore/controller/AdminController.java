package com.clothingstore.controller;

import com.clothingstore.dto.HeaderResponse;
import com.clothingstore.dto.cloth.ClothRequest;
import com.clothingstore.dto.cloth.FullClothResponse;
import com.clothingstore.dto.order.OrderResponse;
import com.clothingstore.dto.user.BaseUserResponse;
import com.clothingstore.dto.user.UserResponse;
import com.clothingstore.dto.mapper.ClothMapper;
import com.clothingstore.dto.mapper.OrderMapper;
import com.clothingstore.dto.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.clothingstore.consts.PathConstants.*;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping(API_V1_ADMIN)
public class AdminController {

    private final ClothMapper clothMapper;
    private final UserMapper userMapper;
    private final OrderMapper orderMapper;

    @PostMapping(ADD_CLOTH)
    public ResponseEntity<FullClothResponse> addCloth(@RequestPart(name = "file", required = true) MultipartFile file,
                                                      @RequestPart("cloth") @Valid ClothRequest clothRequest,
                                                      BindingResult bindingResult) {


        System.out.println(clothRequest);
        return ResponseEntity.ok(clothMapper.saveCloth(clothRequest, file, bindingResult));
    }

    @PostMapping(EDIT_BY_CLOTH_ID)
    public ResponseEntity<FullClothResponse> updateCloth(@RequestPart(name = "file", required = false) MultipartFile file,
                                                         @RequestPart("cloth") @Valid ClothRequest cloth, @PathVariable Long clothId,
                                                         BindingResult bindingResult) {
        return ResponseEntity.ok(clothMapper.editCloth(cloth, file, clothId, bindingResult));
    }

    @DeleteMapping(DELETE_BY_CLOTH_ID)
    public ResponseEntity<Map<String, Object>> deleteCloth(@PathVariable Long clothId) {
        Map<String, Object> response = new HashMap<>();
        HttpStatus status;
        String message;

        try {
            message = clothMapper.deleteCloth(clothId);
            status = HttpStatus.OK; // Operation successful
        } catch (DataIntegrityViolationException e) {
            message = "Cannot delete cloth because it is referenced in orders.";
            status = HttpStatus.BAD_REQUEST; // Failure due to data integrity violation
        } catch (Exception e) {
            message = "An unexpected error occurred while deleting the cloth.";
            status = HttpStatus.BAD_REQUEST;// Unexpected failure
        }

        response.put("success", status == HttpStatus.OK);
        response.put("message", message);
        return ResponseEntity.status(status).body(response);
    }



    @GetMapping(ORDERS)
    public ResponseEntity<List<OrderResponse>> getAllOrders(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<OrderResponse> response = orderMapper.getAllOrders(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(ORDER_BY_EMAIL)
    public ResponseEntity<List<OrderResponse>> getUserOrdersByEmail(@PathVariable String userEmail,
                                                                    @PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<OrderResponse> response = orderMapper.getUserOrders(userEmail, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @DeleteMapping(ORDER_DELETE)
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderMapper.deleteOrder(orderId));
    }

    @GetMapping(USER_BY_ID)
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(userMapper.getUserById(userId));
    }

    @GetMapping(USER_ALL)
    public ResponseEntity<List<BaseUserResponse>> getAllUsers(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<BaseUserResponse> response = userMapper.getAllUsers(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }
}
