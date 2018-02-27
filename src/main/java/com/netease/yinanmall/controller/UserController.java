package com.netease.yinanmall.controller;

import com.netease.yinanmall.db.BuyerRepository;
import com.netease.yinanmall.db.SellerRepository;
import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final BuyerRepository buyerRepository;

    private final SellerRepository sellerRepository;

    @Autowired
    public UserController(BuyerRepository buyerRepository, SellerRepository sellerRepository) {
        this.buyerRepository = buyerRepository;
        this.sellerRepository = sellerRepository;
    }

    @RequestMapping(value = "/login_buyer", method = RequestMethod.POST)
    public ResponseEntity buyerLogin(@RequestBody Buyer buyer) {
        System.out.println("trying to login buyer");
        Buyer loginBuyer = buyerRepository.findBuyerByUsernameAndPassword(buyer.getUsername(), buyer.getPassword());
        if (loginBuyer == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(loginBuyer, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/login_seller", method = RequestMethod.POST)
    public ResponseEntity sellerLogin(@RequestBody Seller seller) {
        Seller loginSeller = sellerRepository.findSellerByUsernameAndPassword(seller.getUsername(), seller.getPassword());
        if (loginSeller == null) {
            return new ResponseEntity(HttpStatus.I_AM_A_TEAPOT);
        } else {
            return new ResponseEntity<>(loginSeller, HttpStatus.OK);
        }
    }
}
