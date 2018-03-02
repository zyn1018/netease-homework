package com.netease.yinanmall.db;

import com.netease.yinanmall.pojo.OrderItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<OrderItem, String> {
}
