package com.netease.yinanmall;

import com.netease.yinanmall.config.MongoConfig;
import com.netease.yinanmall.db.BuyerRepository;
import com.netease.yinanmall.db.ProductRepository;
import com.netease.yinanmall.db.SellerRepository;
import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.Product;
import com.netease.yinanmall.pojo.Seller;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

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
    public void addProduct() {
        Product product = new Product();
        product.setProductId(10);
        product.setTitle("DMS");
        product.setPrice(34.5);
        product.setImgUrl("http://www.youth.gov.hk/html/www/en/images/career-and-study/upload-images/it/multimedia-front.jpg");
        product.setIntroduction("HUE HUE HUE");
        product.setDetail("Course for distributed multimedia systems");
        productRepository.save(product);
    }

}
