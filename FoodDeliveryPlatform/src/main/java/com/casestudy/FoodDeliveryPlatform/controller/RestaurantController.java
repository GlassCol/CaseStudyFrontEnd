package com.casestudy.FoodDeliveryPlatform.controller;

import com.casestudy.FoodDeliveryPlatform.model.Restaurant;
import com.casestudy.FoodDeliveryPlatform.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/v1/")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }
    @PostMapping("/restaurants")
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant){
        return restaurantService.createRestaurant(restaurant);
    }
    @GetMapping("/restaurants/{restaurantId}")
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable Long restaurantId){
        Restaurant restaurant = null;
        restaurant = restaurantService.getRestaurantById(restaurantId);
        return ResponseEntity.ok(restaurant);
    }
    @GetMapping("/restaurants")
    public List<Restaurant> getRestaurants(){
        return this.restaurantService.getAllRestaurants();
    }
    @PutMapping("/restaurants/{restaurantId}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long restaurantId, @RequestBody Restaurant restaurant){
        restaurant = restaurantService.updateRestaurant(restaurantId, restaurant);
        return ResponseEntity.ok(restaurant);
    }
    @DeleteMapping("/restaurants/{restaurantId}")
    public ResponseEntity<Map<String, Boolean>> deleteRestaurantById(@PathVariable Long restaurantId){
        boolean deleted = false;
        deleted = restaurantService.deleteRestaurantById(restaurantId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
