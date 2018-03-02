package com.netease.yinanmall.db;

import com.netease.yinanmall.pojo.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<CartItem, String> {
    CartItem findCartItemByCartItemId(String cartItemId);
}
