package com.netease.yinanmall.service;

import com.netease.yinanmall.pojo.OrderItem;
import org.springframework.http.ResponseEntity;

/**
 * @author yinan
 */
public interface OrderService {

    /**
     * 提交订单
     *
     * @param orderItem
     * @return
     */
    ResponseEntity<?> saveOrderItem(OrderItem orderItem);

    /**
     * 获取所有的历史订单信息
     *
     * @return
     */
    ResponseEntity<?> getOrderItemList();

    /**
     * 根据商品标题获取订单信息
     *
     * @param title
     * @return
     */
    ResponseEntity<?> getOrderItemByTitle(String title);

}
