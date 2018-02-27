package com.netease.yinanmall.db;

import com.netease.yinanmall.pojo.Buyer;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author yinan
 */
public interface BuyerRepository extends MongoRepository<Buyer, Integer> {
    Buyer findBuyerByUsernameAndPassword(String username, String password);
}
