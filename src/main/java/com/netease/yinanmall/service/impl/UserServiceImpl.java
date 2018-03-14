package com.netease.yinanmall.service.impl;

import com.netease.yinanmall.dao.BuyerRepository;
import com.netease.yinanmall.dao.SellerRepository;
import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.Seller;
import com.netease.yinanmall.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 * @author yinan
 */
@Service("UserService")
public class UserServiceImpl implements UserService {

    private final BuyerRepository buyerRepository;

    private final SellerRepository sellerRepository;

    @Autowired
    public UserServiceImpl(BuyerRepository buyerRepository, SellerRepository sellerRepository) {
        this.buyerRepository = buyerRepository;
        this.sellerRepository = sellerRepository;
    }

    @Override
    public ResponseEntity<?> loginBuyer(String username, String password) {
        Buyer loginBuyer = buyerRepository.findBuyerByUsernameAndPassword(username, password);
        if (loginBuyer != null) {
            return new ResponseEntity<>(loginBuyer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> loginSeller(String username, String password) {
        Seller loginSeller = sellerRepository.findSellerByUsernameAndPassword(username, password);
        if (loginSeller != null) {
            return new ResponseEntity<>(loginSeller, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
