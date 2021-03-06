package com.netease.yinanmall.controller;

import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.OrderItem;
import com.netease.yinanmall.pojo.Seller;
import com.netease.yinanmall.service.OrderService;
import com.netease.yinanmall.utils.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * @author yinan
 */
@RestController
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * 提交订单
     *
     * @param orderItem
     * @param session
     * @return
     */
    @RequestMapping(value = "/save_order_item", method = RequestMethod.POST)
    public ResponseEntity<?> saveOrderItem(@RequestBody OrderItem orderItem, HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return this.orderService.saveOrderItem(orderItem);
        }
    }

    /**
     * 获取所有的订单历史详情
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "/get_all_order_items", method = RequestMethod.GET)
    public ResponseEntity<?> getAllOrderItems(HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        Seller seller = (Seller) session.getAttribute(Const.CURRENT_SELLER);
        if (buyer == null && seller == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return this.orderService.getOrderItemList();
        }
    }

    /**
     * 根据商品标题获取单个商品的购买历史信息
     *
     * @param title
     * @param session
     * @return
     */
    @RequestMapping(value = "/get_order_item_by_title/{title}", method = RequestMethod.GET)
    public ResponseEntity<?> getOrderItemByTitle(@PathVariable String title, HttpSession session) {
        return this.orderService.getOrderItemByTitle(title);
    }
}
