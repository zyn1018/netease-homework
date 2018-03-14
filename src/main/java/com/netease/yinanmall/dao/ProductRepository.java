package com.netease.yinanmall.dao;

import com.netease.yinanmall.pojo.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author yinan
 */
public interface ProductRepository extends MongoRepository<Product, String> {

    Product findProductByProductId(String productId);

    void deleteProductByProductId(String productId);

    List<Product> findProductsByBoughtFalse();

    Product findProductByTitle(String title);
}
