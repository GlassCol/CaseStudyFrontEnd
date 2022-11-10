package com.casestudy.FoodDeliveryPlatform.repository;

import com.casestudy.FoodDeliveryPlatform.entity.RestaurantEntity;
import com.casestudy.FoodDeliveryPlatform.model.Restaurant;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<RestaurantEntity, Long> {
    /**
     * Gets the last element from the jpa
     * @return Restaurant: the last restaurant in the database
     */
    public default Restaurant findLastAddition(){
        List<RestaurantEntity> restaurantList = this.findAll();
        RestaurantEntity restaurantEntity = restaurantList.get(restaurantList.size() -1);
        Restaurant restaurant = new Restaurant();
        BeanUtils.copyProperties(restaurantEntity, restaurant);
        return restaurant;
    }
}
