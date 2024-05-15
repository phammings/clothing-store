package com.clothingstore.dto.cloth;

import com.clothingstore.consts.enums.SearchCloth;
import lombok.Data;

@Data
public class SearchTypeRequest {
    private SearchCloth searchType;
    private String text;
}
