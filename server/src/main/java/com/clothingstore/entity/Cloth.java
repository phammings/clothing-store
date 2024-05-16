package com.clothingstore.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Table(name = "cloth")
public class Cloth {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cloth_id_seq")
    @SequenceGenerator(name = "cloth_id_seq", sequenceName = "cloth_id_seq", initialValue = 109, allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "country")
    private String country;

    @Column(name = "description")
    private String description;

    @Column(name = "filename")
    private String filename;

    @Column(name = "base_notes")
    private String baseNote;

    @Column(name = "middle_notes")
    private String middleNote;

    @Column(name = "top_notes")
    private String topNote;

    @Column(name = "gender")
    private String gender;

    @Column(name = "title")
    private String title;

    @Column(name = "color")
    private String color;

    @Column(name = "price")
    private Double price;

    @Column(name = "type")
    private String type;

    @Column(name = "size")
    private String size;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "brand")
    private String brand;

    @OneToMany
    @ToString.Exclude
    private List<Review> reviews;

    @Override
    public boolean equals(Object obj) {
        if(this==obj) return true;
        if (obj==null || getClass() != obj.getClass()) return false;
        Cloth cloth = (Cloth) obj;
        return Objects.equals(id, cloth.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
