package com.netease.yinanmall.db;

import com.netease.yinanmall.pojo.Seller;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author yinan
 */
public interface SellerRepository extends MongoRepository<Seller, Integer> {
    Seller findSellerByUsernameAndPassword(String username, String password);
}
