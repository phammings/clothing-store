package com.clothingstore.service.impl;

import com.clothingstore.consts.ErrorMessage;
import com.clothingstore.entity.Cloth;
import com.clothingstore.entity.Review;
import com.clothingstore.exception.ApiRequestException;
import com.clothingstore.repo.ClothRepository;
import com.clothingstore.repo.ReviewRepository;
import com.clothingstore.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ClothRepository clothRepository;
    private final ReviewRepository reviewRepository;
    @Override
    public List<Review> getReviewsByClothId(Long clothId) {
        Cloth cloth = clothRepository.findById(clothId)
                .orElseThrow(()-> new ApiRequestException(ErrorMessage.CLOTH_NOT_FOUND, HttpStatus.NOT_FOUND));
        return cloth.getReviews();
    }

    @Override
    @Transactional
    public Review addReviewToCloth(Review review, Long clothId) {
        Cloth cloth = clothRepository.findById(clothId)
                .orElseThrow(()-> new ApiRequestException(ErrorMessage.CLOTH_NOT_FOUND, HttpStatus.NOT_FOUND));
        List<Review> reviews = cloth.getReviews();
        reviews.add(review);
        double totalReviews = reviews.size();
        double sumRating = reviews.stream().mapToInt(Review::getRating).sum();
        cloth.setRating(sumRating / totalReviews);
        return reviewRepository.save(review);
    }
}
