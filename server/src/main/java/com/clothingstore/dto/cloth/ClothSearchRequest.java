package com.clothingstore.dto.cloth;

import lombok.Data;

import java.util.List;

@Data
public class ClothSearchRequest {
    private List<String> brands;
    private List<String> genders;
    private List<Double> prices;
    private Boolean sortByPrice;
    private String brand;
    private String gender;
}
