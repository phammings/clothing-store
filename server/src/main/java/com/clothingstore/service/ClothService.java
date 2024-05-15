package com.clothingstore.service;

import com.clothingstore.entity.Cloth;
import com.clothingstore.dto.cloth.ClothSearchRequest;
import com.clothingstore.consts.enums.SearchCloth;
import com.clothingstore.repo.ClothProjection;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ClothService {

    Cloth getClothById(Long clothId);

    Page<ClothProjection> getAllCloths(Pageable pageable);

    List<ClothProjection> getClothsByIds(List<Long> clothsId);

    Page<ClothProjection> findClothsByFilterParams(ClothSearchRequest filter, Pageable pageable);

    List<Cloth> findByBrand(String brand);

    List<Cloth> findByClothGender(String gender);

    Page<ClothProjection> findByInputText(SearchCloth searchType, String text, Pageable pageable);

    Cloth saveCloth(Cloth cloth, MultipartFile file);

    Cloth editCloth(Cloth cloth, MultipartFile file, Long clothId);

    String deleteCloth(Long clothId);

//    DataFetcher<Cloth> getClothByQuery();
//
//    DataFetcher<List<ClothProjection>> getAllClothsByQuery();
//
//    DataFetcher<List<Cloth>> getAllClothsByIdsQuery();
}
