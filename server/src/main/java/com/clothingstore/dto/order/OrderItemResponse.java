package com.clothingstore.dto.order;

import com.clothingstore.dto.cloth.ClothResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemResponse {
    private Long id;
    private Long amount;
    private Long quantity;
    private ClothResponse cloth;
}
