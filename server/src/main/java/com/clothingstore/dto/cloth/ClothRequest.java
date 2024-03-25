package com.clothingstore.dto.cloth;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import static com.clothingstore.consts.ErrorMessage.FILL_IN_THE_INPUT_FIELD;

@Data
public class ClothRequest {

    private Long id;
    private String filename;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String title;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String brand;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String country;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String gender;

    @Length(max = 255)
    private String topNote;

    @Length(max = 255)
    private String middleNote;

    @Length(max = 255)
    private String baseNote;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String description;

    @NotNull(message = FILL_IN_THE_INPUT_FIELD)
    private Double price;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String type;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String size;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    @Length(max = 255)
    private String color;
}
