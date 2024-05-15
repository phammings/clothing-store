package com.clothingstore.controller;

import com.clothingstore.consts.PathConstants;
import com.clothingstore.dto.review.ReviewRequest;
import com.clothingstore.dto.review.ReviewResponse;
import com.clothingstore.dto.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.API_V1_REVIEW)
public class ReviewController {

    private final ReviewMapper reviewMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping(PathConstants.CLOTH_ID)
    public ResponseEntity<List<ReviewResponse>> getReviewsByClothId(@PathVariable Long clothId) {
        return ResponseEntity.ok(reviewMapper.getReviewsByClothId(clothId));
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> addReviewToPerfume(@Valid @RequestBody ReviewRequest reviewRequest,
                                                             BindingResult bindingResult) {
        ReviewResponse review = reviewMapper.addReviewToCloth(reviewRequest, reviewRequest.getClothId(), bindingResult);
        messagingTemplate.convertAndSend("/topic/reviews/" + reviewRequest.getClothId(), review);
        return ResponseEntity.ok(review);
    }
}
