package com.casestudy.FoodDeliveryPlatform.repository;

import com.casestudy.FoodDeliveryPlatform.entity.ItemEntity;
import com.casestudy.FoodDeliveryPlatform.model.Item;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
    /**
     * Gets the last element from the jpa
     * @return Item: the last item in the database
     */
    public default Item findLastAddition(){
        List<ItemEntity> itemList = this.findAll();
        ItemEntity itemEntity = itemList.get(itemList.size() -1);
        Item item = new Item();
        BeanUtils.copyProperties(itemEntity, item);
        return item;
    }
}
