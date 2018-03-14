package com.netease.yinanmall.service.impl;

import com.netease.yinanmall.dao.CartRepository;
import com.netease.yinanmall.pojo.CartItem;
import com.netease.yinanmall.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author yinan
 */
@Service("CartService")
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public ResponseEntity<?> addCartItem(CartItem cartItem) {
        if (cartItem != null) {
            this.cartRepository.save(cartItem);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getCartItemList() {
        List<CartItem> cartItemList = this.cartRepository.findAll();
        if (cartItemList != null) {
            return new ResponseEntity<>(cartItemList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<?> deleteCartItemById(String cartItemId) {
        if (cartItemId != null && cartItemId.length() > 0) {
            CartItem cartItem = this.cartRepository.findOne(cartItemId);
            if (cartItem != null) {
                this.cartRepository.delete(cartItemId);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getCartItemById(String cartItemId) {
        if (cartItemId != null && cartItemId.length() > 0) {
            CartItem cartItem = this.cartRepository.findCartItemByCartItemId(cartItemId);
            return new ResponseEntity<>(cartItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> deleteAllCartItems() {
        this.cartRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
