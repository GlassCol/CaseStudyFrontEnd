package com.casestudy.FoodDeliveryPlatform.repository;

import com.casestudy.FoodDeliveryPlatform.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
}
