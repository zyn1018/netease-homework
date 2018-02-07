package com.netease.yinanmall.db;

import com.netease.yinanmall.pojo.Buyer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BuyerRepository extends MongoRepository<Buyer, String> {
}
