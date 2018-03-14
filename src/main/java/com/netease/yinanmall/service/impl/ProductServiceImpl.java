package com.netease.yinanmall.service.impl;

import com.netease.yinanmall.dao.ProductRepository;
import com.netease.yinanmall.pojo.Product;
import com.netease.yinanmall.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author yinan
 */
@Service("ProductService")
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ResponseEntity<?> getProductList() {
        List<Product> productList = this.productRepository.findAll();
        if (productList != null) {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<?> getProductById(String productId) {
        if (productId != null && productId.length() > 0) {
            Product product = this.productRepository.findProductByProductId(productId);
            if (product != null) {
                return new ResponseEntity<>(product, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<?> saveOrUpdateProduct(Product product) {
        if (product != null) {
            Product productSaved = this.productRepository.save(product);
            return new ResponseEntity<>(productSaved, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> deleteProductById(String productId) {
        if (productId != null && productId.length() > 0) {
            Product product = this.productRepository.findProductByProductId(productId);
            if (product != null) {
                this.productRepository.deleteProductByProductId(productId);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<?> getUnboughtProductList() {
        List<Product> productList = this.productRepository.findProductsByBoughtFalse();
        if (productList != null) {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<?> getProductByTitle(String title) {
        if (title != null && title.length() != 0) {
            Product product = this.productRepository.findProductByTitle(title);
            if (product != null) {
                return new ResponseEntity<>(product, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
