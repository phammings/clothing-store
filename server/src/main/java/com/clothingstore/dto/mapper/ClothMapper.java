package com.clothingstore.dto.mapper;

import com.clothingstore.entity.Cloth;
import com.clothingstore.dto.HeaderResponse;
import com.clothingstore.dto.cloth.ClothRequest;
import com.clothingstore.dto.cloth.ClothResponse;
import com.clothingstore.dto.cloth.ClothSearchRequest;
import com.clothingstore.dto.cloth.FullClothResponse;
import com.clothingstore.consts.enums.SearchCloth;
import com.clothingstore.exception.InputFieldException;
import com.clothingstore.repo.ClothProjection;
import com.clothingstore.service.ClothService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ClothMapper {

    private final CommonMapper commonMapper;
    private final ClothService clothService;

    public FullClothResponse getClothById(Long clothId) {
        return commonMapper.convertToResponse(clothService.getClothById(clothId), FullClothResponse.class);
    }

    public List<ClothResponse> getClothsByIds(List<Long> clothIds) {
        return commonMapper.convertToResponseList(clothService.getClothsByIds(clothIds),ClothResponse.class);
    }

    public HeaderResponse<ClothResponse> getAllCloths(Pageable pageable) {
        Page<ClothProjection> cloths = clothService.getAllCloths(pageable);
        return commonMapper.getHeaderResponse(cloths.getContent(), cloths.getTotalPages(), cloths.getTotalElements(), ClothResponse.class);
    }

    public HeaderResponse<ClothResponse> findClothsByFilterParams(ClothSearchRequest filter, Pageable pageable) {
        Page<ClothProjection> cloths = clothService.findClothsByFilterParams(filter, pageable);
        return commonMapper.getHeaderResponse(cloths.getContent(), cloths.getTotalPages(), cloths.getTotalElements(), ClothResponse.class);
    }

    public List<ClothResponse> findByBrand(String brand) {
        return commonMapper.convertToResponseList(clothService.findByBrand(brand), ClothResponse.class);
    }

    public List<ClothResponse> findByClothGender(String gender) {
        return commonMapper.convertToResponseList(clothService.findByClothGender(gender), ClothResponse.class);
    }

    public HeaderResponse<ClothResponse> findByInputText(SearchCloth searchType, String text, Pageable pageable) {
        Page<ClothProjection> cloths = clothService.findByInputText(searchType, text, pageable);
        return commonMapper.getHeaderResponse(cloths.getContent(), cloths.getTotalPages(), cloths.getTotalElements(), ClothResponse.class);
    }

    public FullClothResponse saveCloth(ClothRequest clothRequest, MultipartFile file, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Cloth cloth = commonMapper.convertToEntity(clothRequest, Cloth.class);
        return commonMapper.convertToResponse(clothService.saveCloth(cloth, file), FullClothResponse.class);
    }

    public FullClothResponse editCloth(ClothRequest clothRequest, MultipartFile file, Long clothId, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Cloth cloth = commonMapper.convertToEntity(clothRequest, Cloth.class);
        return commonMapper.convertToResponse(clothService.editCloth(cloth, file, clothId), FullClothResponse.class);
    }

    public String deleteCloth(Long clothId) {
        return clothService.deleteCloth(clothId);
    }
}
