package com.netease.yinanmall.db;

import com.netease.yinanmall.pojo.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, Integer> {
    Product findProductByProductId(Integer productId);

    void deleteProductByProductId(Integer productId);
}
