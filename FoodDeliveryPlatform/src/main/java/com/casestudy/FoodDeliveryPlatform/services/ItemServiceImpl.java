package com.casestudy.FoodDeliveryPlatform.services;

import com.casestudy.FoodDeliveryPlatform.entity.ItemEntity;
import com.casestudy.FoodDeliveryPlatform.model.Item;
import com.casestudy.FoodDeliveryPlatform.repository.ItemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService{
    private ItemRepository itemRepository;
    private ItemServiceImpl(ItemRepository itemRepository){
        this.itemRepository = itemRepository;
    }
    @Override
    public Item createItem(Item item) {
        ItemEntity itemEntity = new ItemEntity();
        BeanUtils.copyProperties(item, itemEntity);
        itemRepository.save(itemEntity);
        item = itemRepository.findLastAddition();
        return item;
    }

    @Override
    public Item getItemById(Long id) {
        ItemEntity itemEntity = itemRepository.findById(id).get();
        Item item = new Item();
        BeanUtils.copyProperties(itemEntity, item);
        return item;
    }

    @Override
    public List<Item> getAllItems() {
        List<ItemEntity> itemEntities = itemRepository.findAll();
        List<Item> items = itemEntities.stream()
                .map(item -> new Item(item.getId(), item.getRestId(), item.getName(), item.getPrice()))
                .collect(Collectors.toList());
        return items;
    }

    @Override
    public Item updateItem(Long id, Item item) {
        ItemEntity itemEntity = itemRepository.findById(id).get();
        itemEntity.setName(item.getName());
        itemEntity.setRestId(item.getRestId());
        itemEntity.setPrice(item.getPrice());
        itemRepository.save(itemEntity);
        return item;
    }

    @Override
    public boolean deleteItemById(Long id) {
        ItemEntity item = itemRepository.findById(id).get();
        itemRepository.delete(item);
        return true;
    }

    @Override
    public List<Item> getAllRestItems(Long restId) {
        List<ItemEntity> itemEntities = itemRepository.findAll();
        List<Item> items = itemEntities.stream()
                .map(item -> new Item(item.getId(), item.getRestId(), item.getName(), item.getPrice()))
                .filter(item -> item.getRestId() == restId)
                .collect(Collectors.toList());
        return items;
    }

    /**
     * Gets the latest Id for testing Purpose
     * @return Long: the latest Id
     */
    public Long getLatestId(){
        return itemRepository.findLastAddition().getId();
    }
}
