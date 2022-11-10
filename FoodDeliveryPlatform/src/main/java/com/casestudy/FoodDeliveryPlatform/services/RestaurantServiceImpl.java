package com.casestudy.FoodDeliveryPlatform.services;

import com.casestudy.FoodDeliveryPlatform.entity.RestaurantEntity;
import com.casestudy.FoodDeliveryPlatform.model.Restaurant;
import com.casestudy.FoodDeliveryPlatform.repository.RestaurantRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantServiceImpl implements RestaurantService{
    private RestaurantRepository restaurantRepository;
    private RestaurantServiceImpl(RestaurantRepository restaurantRepository){
        this.restaurantRepository = restaurantRepository;
    }
    @Override
    public Restaurant createRestaurant(Restaurant restaurant) {
        RestaurantEntity restaurantEntity = new RestaurantEntity();
        BeanUtils.copyProperties(restaurant, restaurantEntity);
        restaurantRepository.save(restaurantEntity);
        return restaurant;
    }

    @Override
    public Restaurant getRestaurantById(Long id) {
            RestaurantEntity restaurantEntity = restaurantRepository.findById(id).get();
            Restaurant restaurant = new Restaurant();
            BeanUtils.copyProperties(restaurantEntity, restaurant);
             return restaurant;
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        List<RestaurantEntity> restaurantEntities = restaurantRepository.findAll();
        List<Restaurant> restaurants = restaurantEntities.stream()
                .map(res -> new Restaurant(res.getId(),res.getName(),res.getEmailId(),res.getLicense()))
                .collect(Collectors.toList());
        return restaurants;
    }

    @Override
    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {
        RestaurantEntity restaurantEntity = restaurantRepository.findById(id).get();
        restaurantEntity.setName(restaurant.getName());
        restaurantEntity.setEmailId(restaurant.getEmailId());
        restaurantEntity.setLicense(restaurant.getLicense());
        restaurantRepository.save(restaurantEntity);
        return restaurant;
    }

    @Override
    public boolean deleteRestaurantById(Long id) {
        RestaurantEntity restaurant = restaurantRepository.findById(id).get();
        restaurantRepository.delete(restaurant);
        return true;
    }

    @Override
    public Long getLatestId() {
        return restaurantRepository.findLastAddition().getId();
    }


}
