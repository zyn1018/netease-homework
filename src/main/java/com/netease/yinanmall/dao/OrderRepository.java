package com.netease.yinanmall.dao;

import com.netease.yinanmall.pojo.OrderItem;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author yinan
 */
public interface OrderRepository extends MongoRepository<OrderItem, String> {
    OrderItem findOrderItemByTitle(String title);
}
