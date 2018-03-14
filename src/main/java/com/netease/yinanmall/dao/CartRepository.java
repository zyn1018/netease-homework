package com.netease.yinanmall.dao;

import com.netease.yinanmall.pojo.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author yinan
 */
public interface CartRepository extends MongoRepository<CartItem, String> {
    CartItem findCartItemByCartItemId(String cartItemId);
}
