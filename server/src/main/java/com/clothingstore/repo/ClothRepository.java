package com.clothingstore.repo;

import com.clothingstore.entity.Cloth;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothRepository extends JpaRepository<Cloth, Long> {

    List<ClothProjection> findAllByOrderByIdAsc();

    @Query("SELECT cloth FROM Cloth cloth ORDER BY cloth.id ASC")
    Page<ClothProjection> findAllByOrderByIdAsc(Pageable pageable);

    List<Cloth> findByGenderOrderByPriceDesc(String gender);

    List<Cloth> findByBrandOrderByPriceDesc(String brand);

    List<Cloth> findByIdIn(List<Long> clothIds);

    @Query("SELECT cloth FROM Cloth cloth WHERE cloth.id IN :clothIds")
    List<ClothProjection> getClothsByIds(List<Long> clothIds);

    @Query("SELECT cloth FROM Cloth cloth " +
            "WHERE (coalesce(:brands, null) IS NULL OR cloth.brand IN :brands) " +
            "AND (coalesce(:genders, null) IS NULL OR cloth.gender IN :genders) " +
            "AND (coalesce(:priceStart, null) IS NULL OR cloth.price BETWEEN :priceStart AND :priceEnd) " +
            "ORDER BY CASE WHEN :sortByPrice = true THEN cloth.price ELSE -cloth.price END ASC")
    Page<ClothProjection> findClothsByFilterParams(
            List<String> brands,
            List<String> genders,
            Double priceStart,
            Double priceEnd,
            boolean sortByPrice,
            Pageable pageable);

    @Query("SELECT cloth FROM Cloth cloth " +
            "WHERE UPPER(cloth.brand) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY cloth.price DESC")
    Page<ClothProjection> findByBrand(String text, Pageable pageable);

    @Query("SELECT cloth FROM Cloth cloth " +
            "WHERE UPPER(cloth.title) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY cloth.price DESC")
    Page<ClothProjection> findByTitle(String text, Pageable pageable);

    @Query("SELECT cloth FROM Cloth cloth " +
            "WHERE UPPER(cloth.country) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY cloth.price DESC")
    Page<ClothProjection> findByCountry(String text, Pageable pageable);
}
