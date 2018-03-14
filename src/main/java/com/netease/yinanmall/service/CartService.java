package com.netease.yinanmall.service;

import com.netease.yinanmall.pojo.CartItem;
import org.springframework.http.ResponseEntity;

/**
 * @author yinan
 */
public interface CartService {

    /**
     * 添加商品到购物车
     *
     * @param cartItem
     * @return
     */
    ResponseEntity<?> addCartItem(CartItem cartItem);

    /**
     * 获取购物车内的商品列表
     *
     * @return
     */
    ResponseEntity<?> getCartItemList();

    /**
     * 根据商品id删除购物车内商品
     *
     * @param cartItemId
     * @return
     */
    ResponseEntity<?> deleteCartItemById(String cartItemId);

    /**
     * 根据id获取购物车内商品
     *
     * @param cartItemId
     * @return
     */
    ResponseEntity<?> getCartItemById(String cartItemId);

    /**
     * 清空购物车
     *
     * @return
     */
    ResponseEntity<?> deleteAllCartItems();
}
