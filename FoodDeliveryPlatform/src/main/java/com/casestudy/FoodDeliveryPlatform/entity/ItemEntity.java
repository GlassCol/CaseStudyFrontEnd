package com.casestudy.FoodDeliveryPlatform.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "items")
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long restId;
    private String name;
    private Long price;
}
