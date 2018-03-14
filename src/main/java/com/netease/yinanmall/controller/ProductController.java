package com.netease.yinanmall.controller;

import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.Product;
import com.netease.yinanmall.pojo.Seller;
import com.netease.yinanmall.service.ProductService;
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
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * 获得所有的商品信息
     *
     * @return
     */
    @RequestMapping(value = "/all_products", method = RequestMethod.GET)
    public ResponseEntity<?> getAllProducts() {
        return this.productService.getProductList();
    }

    /**
     * 根据productId获取单件商品的信息
     *
     * @param productId
     * @return
     */
    @RequestMapping(value = "/product/{productId}", method = RequestMethod.GET)
    public ResponseEntity<?> getProductById(@PathVariable String productId) {
        return this.productService.getProductById(productId);
    }

    /**
     * 添加新商品
     *
     * @param product
     * @param session
     * @return
     */
    @RequestMapping(value = "/add_product", method = RequestMethod.POST)
    public ResponseEntity<?> addProduct(@RequestBody Product product, HttpSession session) {
        Seller seller = (Seller) session.getAttribute(Const.CURRENT_SELLER);
        if (seller == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return this.productService.saveOrUpdateProduct(product);
        }
    }

    /**
     * 根据productId删除单件商品
     *
     * @param productId
     * @param session
     * @return
     */
    @RequestMapping(value = "/delete_product/{productId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProductById(@PathVariable String productId, HttpSession session) {
        Seller seller = (Seller) session.getAttribute(Const.CURRENT_SELLER);
        if (seller == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return this.productService.deleteProductById(productId);
        }
    }

    /**
     * 获取所有的未购买的商品
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "/unbought_products", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUnboughtProducts(HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return this.productService.getUnboughtProductList();
        }
    }

    /**
     * 更新修改后的商品信息
     *
     * @param product
     * @param session
     * @return
     */
    @RequestMapping(value = "/update_product", method = RequestMethod.POST)
    public ResponseEntity<?> updateExistedProduct(@RequestBody Product product, HttpSession session) {
        if (session.getAttribute(Const.CURRENT_BUYER) == null && session.getAttribute(Const.CURRENT_SELLER) == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return this.productService.saveOrUpdateProduct(product);
        }
    }

    /**
     * 根据商品标题获取单件商品
     *
     * @param title
     * @param session
     * @return
     */
    @RequestMapping(value = "/get_product_by_title/{title}", method = RequestMethod.GET)
    public ResponseEntity<?> getProductByTitle(@PathVariable String title, HttpSession session) {
        if (session.getAttribute(Const.CURRENT_BUYER) != null || session.getAttribute(Const.CURRENT_SELLER) != null) {
            return this.productService.getProductByTitle(title);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
