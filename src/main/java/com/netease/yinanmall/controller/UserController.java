package com.netease.yinanmall.controller;

import com.netease.yinanmall.pojo.Buyer;
import com.netease.yinanmall.pojo.Seller;
import com.netease.yinanmall.service.UserService;
import com.netease.yinanmall.utils.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author yinan
 */
@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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
            ResponseEntity<?> response = userService.loginBuyer(buyer.getUsername(), buyer.getPassword());
            if (response.getStatusCode().is2xxSuccessful()) {
                session.setAttribute(Const.CURRENT_BUYER, response.getBody());
            }
            return response;
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
            ResponseEntity<?> response = userService.loginSeller(seller.getUsername(), seller.getPassword());
            if (response.getStatusCode().is2xxSuccessful()) {
                session.setAttribute(Const.CURRENT_SELLER, response.getBody());
            }
            return response;
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
