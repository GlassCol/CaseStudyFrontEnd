package com.casestudy.FoodDeliveryPlatform.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.File;

@Entity
@Data
@Table(name = "restaurants")
public class RestaurantEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String emailId;
    private File license;
}
