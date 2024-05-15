package com.clothingstore.service;


import com.clothingstore.entity.Review;

import java.util.List;

public interface ReviewService {

    List<Review> getReviewsByClothId(Long clothId);

    Review addReviewToCloth(Review review, Long clothId);
}
