package com.casestudy.FoodDeliveryPlatform.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//Note...just realized it is bad practice to name a class Item, but it's too late now
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    private Long id;
    private Long restId;
    private String name;
    private Long price;
}
