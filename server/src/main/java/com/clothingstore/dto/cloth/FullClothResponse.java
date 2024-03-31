package com.clothingstore.dto.cloth;

import org.springframework.web.multipart.MultipartFile;

public class FullClothResponse extends ClothResponse{

    private String country;
    private String gender;
    private String description;
    private String type;
    private MultipartFile multipartFile;
}
