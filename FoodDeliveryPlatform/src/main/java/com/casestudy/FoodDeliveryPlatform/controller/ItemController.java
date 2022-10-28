package com.casestudy.FoodDeliveryPlatform.controller;

import com.casestudy.FoodDeliveryPlatform.model.Item;
import com.casestudy.FoodDeliveryPlatform.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/itemApi/v1")
public class ItemController {
    @Autowired
    private ItemService itemService;
    
    public ItemController(ItemService itemService){this.itemService = itemService;}
    @PostMapping("/items")
    public Item createItem(@RequestBody Item item){
        return itemService.createItem(item);
    }
    @GetMapping("/items/{itemId}")
    public ResponseEntity<Item> getItem(@PathVariable Long itemId){
        Item item = null;
        item = itemService.getItemById(itemId);
        return ResponseEntity.ok(item);
    }
    @GetMapping("/items")
    public List<Item> getItems(){
        return this.itemService.getAllItems();
    }
    @GetMapping("/items/{restId}")
    public List<Item> getRestItems(@PathVariable Long restId){
        return this.itemService.getAllRestItems(restId);
    }
    @PutMapping("/items/{itemId}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item item){
        item = itemService.updateItem(id, item);
        return ResponseEntity.ok(item);
    }
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Map<String, Boolean>> deleteItemById(@PathVariable Long itemId){
        boolean deleted = false;
        deleted = itemService.deleteItemById(itemId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
}
