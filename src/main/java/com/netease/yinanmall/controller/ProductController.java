package com.netease.yinanmall.controller;

import com.netease.yinanmall.db.ProductRepository;
import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.Product;
import com.netease.yinanmall.pojo.Seller;
import com.netease.yinanmall.utils.Const;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class ProductController {
    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @RequestMapping(value = "/all_products", method = RequestMethod.GET)
    public ResponseEntity<?> getAllProducts() {
        List<Product> productList = this.productRepository.findAll();
        if (productList != null) {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/product/{productId}", method = RequestMethod.GET)
    public ResponseEntity<?> getProductById(@PathVariable String productId) {
        Product product = this.productRepository.findProductByProductId(productId);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/add_product", method = RequestMethod.POST)
    public ResponseEntity<?> addProduct(@RequestBody Product product, HttpSession session) {
        Seller seller = (Seller) session.getAttribute(Const.CURRENT_SELLER);
        if (seller == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            if (product != null) {
                if (product.getProductId().equals("0")) {
                    product.setProductId(new ObjectId().toString());
                }
                Product productSaved = this.productRepository.save(product);
                return new ResponseEntity<>(productSaved, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

    }

    @RequestMapping(value = "/delete_product/{productId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProductById(@PathVariable String productId, HttpSession session) {
        Seller seller = (Seller) session.getAttribute(Const.CURRENT_SELLER);
        if (seller == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            Product product = this.productRepository.findProductByProductId(productId);
            if (product != null) {
                this.productRepository.deleteProductByProductId(productId);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @RequestMapping(value = "/unbought_products", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUnboughtProducts(HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            List<Product> productList = this.productRepository.findProductsByBoughtFalse();
            return new ResponseEntity<>(productList, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/update_product", method = RequestMethod.POST)
    public ResponseEntity<?> updateExistedProduct(@RequestBody Product product, HttpSession session) {
        if (session.getAttribute(Const.CURRENT_BUYER) == null && session.getAttribute(Const.CURRENT_SELLER) == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            if (product != null) {
                this.productRepository.save(product);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @RequestMapping(value = "/get_product_by_title/{title}", method = RequestMethod.GET)
    public ResponseEntity<?> getProductByTitle(@PathVariable String title, HttpSession session) {
        if (session.getAttribute(Const.CURRENT_BUYER) != null || session.getAttribute(Const.CURRENT_SELLER) != null) {
            if (title != null && title.length() != 0) {
                Product product = this.productRepository.findProductByTitle(title);
                return new ResponseEntity<>(product, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = "/save_image", method = RequestMethod.POST)
    public ResponseEntity<?> saveImage(@RequestParam("image") MultipartFile imageFile) {
        System.out.println("trying to save image");
        System.out.println(imageFile.getOriginalFilename());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
