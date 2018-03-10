package com.netease.yinanmall.controller;

import com.netease.yinanmall.db.BuyerRepository;
import com.netease.yinanmall.db.SellerRepository;
import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.Seller;
import com.netease.yinanmall.utils.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    private final BuyerRepository buyerRepository;

    private final SellerRepository sellerRepository;

    @Autowired
    public UserController(BuyerRepository buyerRepository, SellerRepository sellerRepository) {
        this.buyerRepository = buyerRepository;
        this.sellerRepository = sellerRepository;
    }

    /**
     * Buyer登录
     *
     * @param buyer
     * @param session
     * @return
     */
    @RequestMapping(value = "/login_buyer", method = RequestMethod.POST)
    public ResponseEntity buyerLogin(@RequestBody Buyer buyer, HttpSession session) {
        if (buyer != null) {
            Buyer loginBuyer = buyerRepository.findBuyerByUsernameAndPassword(buyer.getUsername(), buyer.getPassword());
            if (loginBuyer == null) {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            } else {
                session.setAttribute(Const.CURRENT_BUYER, loginBuyer);
                return new ResponseEntity<>(loginBuyer, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Seller登录
     *
     * @param seller
     * @param session
     * @return
     */
    @RequestMapping(value = "/login_seller", method = RequestMethod.POST)
    public ResponseEntity sellerLogin(@RequestBody Seller seller, HttpSession session) {
        if (seller != null) {
            Seller loginSeller = sellerRepository.findSellerByUsernameAndPassword(seller.getUsername(), seller.getPassword());
            if (loginSeller == null) {
                return new ResponseEntity(HttpStatus.I_AM_A_TEAPOT);
            } else {
                session.setAttribute(Const.CURRENT_SELLER, loginSeller);
                return new ResponseEntity<>(loginSeller, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Buyer登出
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "/logout_buyer", method = RequestMethod.POST)
    public ResponseEntity logoutBuyer(HttpSession session) {
        session.removeAttribute(Const.CURRENT_BUYER);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Seller登出
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "/logout_seller", method = RequestMethod.POST)
    public ResponseEntity logoutSeller(HttpSession session) {
        session.removeAttribute(Const.CURRENT_SELLER);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
