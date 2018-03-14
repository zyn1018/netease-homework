package com.netease.yinanmall.service.impl;

import com.netease.yinanmall.dao.OrderRepository;
import com.netease.yinanmall.pojo.OrderItem;
import com.netease.yinanmall.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author yinan
 */
@Service("OrderService")
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public ResponseEntity<?> saveOrderItem(OrderItem orderItem) {
        if (orderItem != null) {
            this.orderRepository.save(orderItem);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getOrderItemList() {
        List<OrderItem> orderItemList = this.orderRepository.findAll();
        return new ResponseEntity<>(orderItemList, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getOrderItemByTitle(String title) {
        if (title != null && title.length() > 0) {
            OrderItem orderItem = this.orderRepository.findOrderItemByTitle(title);
            if (orderItem != null) {
                return new ResponseEntity<>(orderItem, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
