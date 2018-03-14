package com.netease.yinanmall.service;

import com.netease.yinanmall.pojo.Product;
import org.springframework.http.ResponseEntity;

/**
 * @author yinan
 */
public interface ProductService {

    /**
     * 获取所有商品列表
     *
     * @return
     */
    ResponseEntity<?> getProductList();

    /**
     * 根据商品id获取商品
     *
     * @param productId
     * @return
     */
    ResponseEntity<?> getProductById(String productId);

    /**
     * 添加或更新商品
     *
     * @param product
     * @return
     */
    ResponseEntity<?> saveOrUpdateProduct(Product product);

    /**
     * 根据商品id删除已发布的商品
     *
     * @param productId
     * @return
     */
    ResponseEntity<?> deleteProductById(String productId);

    /**
     * 获取未购买的商品列表
     *
     * @return
     */
    ResponseEntity<?> getUnboughtProductList();

    /**
     * 根据商品标题获取商品
     *
     * @param title
     * @return
     */
    ResponseEntity<?> getProductByTitle(String title);


}
