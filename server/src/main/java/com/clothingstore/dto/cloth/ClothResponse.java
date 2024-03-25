package com.clothingstore.dto.cloth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClothResponse {

    private Long id;
    private String title;
    private String brand;
    private Double price;
    private Integer rating;
    private String filename;
    private Integer reviewCount;
}
