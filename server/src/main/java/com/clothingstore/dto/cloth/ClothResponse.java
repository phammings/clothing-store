package com.clothingstore.dto.cloth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClothResponse {

    private Long id;
    private String title;
    private String brand;
    private String gender;
    private String country;
    private String topNote;
    private String middleNote;
    private String baseNote;
    private String description;
    private String type;
    private String size;
    private String color;
    private Double price;
    private Integer rating;
    private String filename;
    private Integer reviewCount;
}
