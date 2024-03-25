package com.clothingstore.service.impl;

import com.clothingstore.consts.ErrorMessage;
import com.clothingstore.entity.Cloth;
import com.clothingstore.dto.cloth.ClothSearchRequest;
import com.clothingstore.consts.enums.SearchCloth;
import com.clothingstore.exception.ApiRequestException;
import com.clothingstore.repo.ClothProjection;
import com.clothingstore.repo.ClothRepository;
import com.clothingstore.service.ClothService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClothServiceImpl implements ClothService {

    private final ClothRepository clothRepository;

    @Override
    public Cloth getClothById(Long clothId) {
        return clothRepository.findById(clothId)
                .orElseThrow(()-> new ApiRequestException(ErrorMessage.CLOTH_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<ClothProjection> getAllCloths(Pageable pageable) {
        return clothRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public List<ClothProjection> getClothsByIds(List<Long> clothsId) {
        return clothRepository.getClothsByIds(clothsId);
    }

    @Override
    public Page<ClothProjection> findClothsByFilterParams(ClothSearchRequest filter, Pageable pageable) {
        return clothRepository.findClothsByFilterParams(
                filter.getBrands(),
                filter.getGenders(),
                filter.getPrices().get(0),
                filter.getPrices().get(1),
                filter.getSortByPrice(),
                pageable
        );
    }

    @Override
    public List<Cloth> findByBrand(String brand) {
        return clothRepository.findByBrandOrderByPriceDesc(brand);
    }

    @Override
    public List<Cloth> findByClothGender(String gender) {
        return clothRepository.findByGenderOrderByPriceDesc(gender);
    }

    @Override
    public Page<ClothProjection> findByInputText(SearchCloth searchType, String text, Pageable pageable) {
      if(searchType.equals(SearchCloth.BRAND)){
          return clothRepository.findByBrand(text,pageable);
      } else if (searchType.equals(SearchCloth.TITLE)) {
          return clothRepository.findByTitle(text, pageable);
      }else {
          return clothRepository.findByCountry(text, pageable);
      }
    }

    @Override
    public Cloth saveCloth(Cloth cloth, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            cloth.setFilename("default.jpg");
        }else {
            try {
                // Get the file and save it
                byte[] bytes = file.getBytes();
                Path path = Paths.get("uploads/cloths/" + UUID.randomUUID() +"."+ getFileExtension(file));
                Files.write(path, bytes);
                cloth.setFilename(String.valueOf(path.toAbsolutePath()));

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return clothRepository.save(cloth);
    }

    @Override
    public Cloth editCloth(Cloth cloth, MultipartFile file, Long clothId) {
        Cloth existignCloth = clothRepository.findById(clothId)
                .orElseThrow(()-> new ApiRequestException(ErrorMessage.CLOTH_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (!file.isEmpty()) {
            try {
                // Get the file and save it
                byte[] bytes = file.getBytes();
                Path path = Paths.get("uploads/cloths/" + UUID.randomUUID() +"."+ getFileExtension(file));
                Files.write(path, bytes);
                cloth.setFilename(path.toString());

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        cloth.setId(existignCloth.getId());
        return clothRepository.save(cloth);

    }

    public String getFileExtension(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    @Override
    public String deleteCloth(Long clothId) {
        Cloth cloth = clothRepository.findById(clothId)
                .orElseThrow(()-> new ApiRequestException(ErrorMessage.CLOTH_NOT_FOUND, HttpStatus.NOT_FOUND));
        clothRepository.delete(cloth);
        return "Cloth deleted successfully";
    }
}
