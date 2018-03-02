package com.netease.yinanmall.controller;

import com.netease.yinanmall.db.CartRepository;
import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.CartItem;
import com.netease.yinanmall.utils.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class CartController {
    private final CartRepository cartRepository;

    @Autowired
    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @RequestMapping(value = "/add_cart_item", method = RequestMethod.POST)
    public ResponseEntity<?> addCartItem(@RequestBody CartItem cartItem, HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            if (cartItem != null) {
                this.cartRepository.save(cartItem);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @RequestMapping(value = "/get_all_cart_items", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCartItems() {
        List<CartItem> cartItemList = this.cartRepository.findAll();
        if (cartItemList != null) {
            return new ResponseEntity<>(cartItemList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @RequestMapping(value = "/delete_cart_item/{cartItemId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCartItemById(@PathVariable String cartItemId, HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            CartItem cartItem = this.cartRepository.findOne(cartItemId);
            if (cartItem != null) {
                this.cartRepository.delete(cartItemId);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @RequestMapping(value = "/get_cart_item/{cartItemId}", method = RequestMethod.GET)
    public ResponseEntity<?> getCartItemById(@PathVariable String cartItemId, HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            CartItem cartItem = this.cartRepository.findCartItemByCartItemId(cartItemId);
            return new ResponseEntity<>(cartItem, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/delete_all_cart_items", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAllCartItems(HttpSession session) {
        Buyer buyer = (Buyer) session.getAttribute(Const.CURRENT_BUYER);
        if (buyer == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            this.cartRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
