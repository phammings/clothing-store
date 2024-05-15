package com.clothingstore.dto.review;

import com.clothingstore.consts.ErrorMessage;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ReviewRequest {

    private Long clothId;

    @NotBlank(message = ErrorMessage.FILL_IN_THE_INPUT_FIELD)
    private String author;

    @NotBlank(message = ErrorMessage.FILL_IN_THE_INPUT_FIELD)
    private String message;

    @NotNull(message = "Choose cloth rating")
    private Integer rating;
}
