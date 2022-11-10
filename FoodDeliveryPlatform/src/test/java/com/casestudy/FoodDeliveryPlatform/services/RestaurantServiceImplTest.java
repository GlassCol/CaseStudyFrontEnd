package com.casestudy.FoodDeliveryPlatform.services;

import com.casestudy.FoodDeliveryPlatform.model.Restaurant;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class RestaurantServiceImplTest {
    private  Long testId = -1L;
    private Restaurant testRestaurant = new Restaurant(null, "testRestaurant", "testRestaurant@restaurant.test", null);
    private Restaurant updateTestRestaurant = new Restaurant(null, "updateTestRestaurant", "epdateTestRestaurant@restaurant.test", null);
    @Autowired
    RestaurantService restaurantService;

    @BeforeEach
    void init(TestInfo testInfo) {
        System.out.println("Start..." + testInfo.getDisplayName());
        testId = restaurantService.getLatestId();
    }

    @AfterEach
    void tearDown(TestInfo testInfo) {
        System.out.println("Finished..." + testInfo.getDisplayName());
    }

    @Test
    @Order(1)
    void createRestaurant() throws Exception {
        assertNotNull(restaurantService.createRestaurant(testRestaurant));
    }

    @Test
    @Order(2)
    void getRestaurantById() throws Exception {
        assertNotNull(restaurantService.getRestaurantById(testId));
    }

    @Test
    @Order(3)
    void getAllRestaurants() throws Exception {
        assertNotNull(restaurantService.getAllRestaurants());
    }

    @Test
    @Order(4)
    void updateRestaurant() throws Exception {
        restaurantService.updateRestaurant(testId, updateTestRestaurant);
        assertEquals(updateTestRestaurant.getName(), restaurantService.getRestaurantById(testId).getName());
        assertEquals(updateTestRestaurant.getEmailId(), restaurantService.getRestaurantById(testId).getEmailId());
    }

    @Test
    @Order(5)
    void deleteRestaurantById() throws Exception {
        assertTrue(restaurantService.deleteRestaurantById(testId));
    }
}