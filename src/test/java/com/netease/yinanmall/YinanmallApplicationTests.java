package com.netease.yinanmall;

import com.netease.yinanmall.config.MongoConfig;
import com.netease.yinanmall.dao.*;
import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.CartItem;
import com.netease.yinanmall.pojo.OrderItem;
import com.netease.yinanmall.pojo.Seller;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = MongoConfig.class)
@SpringBootTest
public class YinanmallApplicationTests {
    @Autowired
    BuyerRepository buyerRepository;

    @Autowired
    SellerRepository sellerRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    OrderRepository orderRepository;

    @Test
    public void contextLoads() {
    }

    @Test
    public void addBuyer() {
        Buyer buyer = new Buyer(3, "123", "123456");
        buyerRepository.save(buyer);
    }

    @Test
    public void addSeller() {
        Seller seller = new Seller(2, "asdasd", "999999");
        sellerRepository.save(seller);
    }

    @Test
    public void addCartItem() {
        CartItem cartItem = new CartItem();
        cartItem.setTitle("PLP");
        cartItem.setCount(1);
        cartItem.setTotalPrice(20.99);
        cartRepository.save(cartItem);
    }

    @Test
    public void addOrder() {
        OrderItem orderItem = new OrderItem();
        orderItem.setTitle("DBMS");
        orderItem.setCount(3);
        orderItem.setDate(new Date());
        orderItem.setTotalPrice(60.0);
        orderRepository.save(orderItem);
    }
}
