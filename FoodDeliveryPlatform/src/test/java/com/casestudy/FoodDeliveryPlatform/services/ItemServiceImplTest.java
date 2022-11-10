package com.casestudy.FoodDeliveryPlatform.services;

import com.casestudy.FoodDeliveryPlatform.model.Item;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class ItemServiceImplTest {

    @Autowired
    private ItemService itemService;

    private Item testItem = new Item(null, -1L, "testItem", -1L);
    private Long testId = -1L;
    private Item updateTestItem = new Item(null, -1L, "test", -2L);

    @BeforeEach
    void init(TestInfo testInfo) {
        System.out.println("Start..." + testInfo.getDisplayName());
        testId = itemService.getLatestId();
    }

    @AfterEach
    void tearDown(TestInfo testInfo) {
        System.out.println("Finished..." + testInfo.getDisplayName());
    }

    @Test
    @Order(1)
    void createItem() throws Exception{
        assertNotNull(itemService.createItem(testItem));
    }

    @Test
    @Order(2)
    void getItemById() throws Exception {
        assertNotNull(itemService.getItemById(testId));
    }

    @Test
    @Order(3)
    void getAllItems() throws Exception {
        assertTrue(itemService.getAllItems().size() > 0);
    }

    @Test
    @Order(4)
    void updateItem() throws Exception {
        itemService.updateItem(testId, updateTestItem);
        Item tempItem = itemService.getItemById(testId);
        assertTrue(tempItem.getPrice() == updateTestItem.getPrice());
    }

    @Test
    @Order(5)
    void getAllRestItems() throws Exception {
        assertNotNull(itemService.getAllRestItems(-1L));
    }

    @Test
    @Order(6)
    void deleteItemById() throws Exception {
        assertTrue(itemService.deleteItemById(testId));
    }
}