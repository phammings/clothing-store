package com.clothingstore.dto.mapper;

import com.clothingstore.entity.Review;
import com.clothingstore.dto.review.ReviewRequest;
import com.clothingstore.dto.review.ReviewResponse;
import com.clothingstore.exception.InputFieldException;
import com.clothingstore.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ReviewMapper {

    private final CommonMapper commonMapper;
    private final ReviewService reviewService;

    public List<ReviewResponse> getReviewsByClothId(Long clothId) {
        return commonMapper.convertToResponseList(reviewService.getReviewsByClothId(clothId), ReviewResponse.class);
    }

    public ReviewResponse addReviewToCloth(ReviewRequest reviewRequest, Long clothId, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Review review = commonMapper.convertToEntity(reviewRequest, Review.class);
        return commonMapper.convertToResponse(reviewService.addReviewToCloth(review, clothId), ReviewResponse.class);
    }
}
