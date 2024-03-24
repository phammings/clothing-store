package com.clothingstore.repo;


import org.springframework.beans.factory.annotation.Value;

public interface ClothProjection {

    Long getId();
    String getClothTitle();
    Double getPrice();
    String getFilename();

    @Value("#{target.review.size()}")
    Integer getReviewsCount();

    void setGender(String gender);
    void setPrice(Double price);
}
