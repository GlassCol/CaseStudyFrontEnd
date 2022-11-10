package com.casestudy.FoodDeliveryPlatform.services;

import com.casestudy.FoodDeliveryPlatform.model.Item;

import java.util.List;

public interface ItemService {
    Item createItem(Item item);

    Item getItemById(Long parseInt);

    List<Item> getAllItems();

    Item updateItem(Long id, Item Item);

    boolean deleteItemById(Long id);

    List<Item> getAllRestItems(Long restId);

    Long getLatestId();
}
