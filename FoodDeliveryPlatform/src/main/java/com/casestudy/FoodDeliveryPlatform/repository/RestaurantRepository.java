package com.casestudy.FoodDeliveryPlatform.repository;

import com.casestudy.FoodDeliveryPlatform.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<RestaurantEntity, Long> {
}
