package com.clothingstore.controller;

import com.clothingstore.consts.PathConstants;
import com.clothingstore.dto.HeaderResponse;
import com.clothingstore.dto.cloth.ClothResponse;
import com.clothingstore.dto.cloth.ClothSearchRequest;
import com.clothingstore.dto.cloth.FullClothResponse;
import com.clothingstore.dto.cloth.SearchTypeRequest;
import com.clothingstore.dto.mapper.ClothMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.clothingstore.consts.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.API_V1_CLOTHS)
public class ClothController {

    private final ClothMapper clothMapper;

    @GetMapping
    public ResponseEntity<List<ClothResponse>> getAllCloths(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ClothResponse> response = clothMapper.getAllCloths(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(PathConstants.CLOTH_ID)
    public ResponseEntity<FullClothResponse> getClothById(@PathVariable Long clothId) {
        return ResponseEntity.ok(clothMapper.getClothById(clothId));
    }

    @PostMapping(PathConstants.IDS)
    public ResponseEntity<List<ClothResponse>> getClothsByIds(@RequestBody List<Long> clothsIds) {
        return ResponseEntity.ok(clothMapper.getClothsByIds(clothsIds));
    }

    @PostMapping(SEARCH)
    public ResponseEntity<List<ClothResponse>> findClothsByFilterParams(@RequestBody ClothSearchRequest filter,
                                                                            @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ClothResponse> response = clothMapper.findClothsByFilterParams(filter, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping(SEARCH_GENDER)
    public ResponseEntity<List<ClothResponse>> findByClothGender(@RequestBody ClothSearchRequest filter) {
        return ResponseEntity.ok(clothMapper.findByClothGender(filter.getGender()));
    }

    @PostMapping(SEARCH_BRAND)
    public ResponseEntity<List<ClothResponse>> findByBrand(@RequestBody ClothSearchRequest filter) {
        return ResponseEntity.ok(clothMapper.findByBrand(filter.getBrand()));
    }

    @PostMapping(SEARCH_TEXT)
    public ResponseEntity<List<ClothResponse>> findByInputText(@RequestBody SearchTypeRequest searchType,
                                                                 @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ClothResponse> response = clothMapper.findByInputText(searchType.getSearchType(), searchType.getText(), pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }
}
