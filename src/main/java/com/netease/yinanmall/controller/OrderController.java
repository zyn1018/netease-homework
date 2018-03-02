package com.netease.yinanmall.controller;

import com.netease.yinanmall.db.OrderRepository;
import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.OrderItem;
import com.netease.yinanmall.utils.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class OrderController {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @RequestMapping(value = "/save_order_item", method = RequestMethod.POST)
    public ResponseEntity<?> saveOrderItem(@RequestBody OrderItem orderItem, HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            if (orderItem != null) {
                this.orderRepository.save(orderItem);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @RequestMapping(value = "/get_all_order_items", method = RequestMethod.GET)
    public ResponseEntity<?> getAllOrderItems(HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            List<OrderItem> orderItemList = this.orderRepository.findAll();
            return new ResponseEntity<>(orderItemList, HttpStatus.OK);
        }
    }
}
