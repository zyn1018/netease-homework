package com.netease.yinanmall.service;

import org.springframework.http.ResponseEntity;

/**
 * @author yinan
 */
public interface UserService {

    /**
     * Buyer登录
     *
     * @param username
     * @param password
     * @return
     */
    ResponseEntity<?> loginBuyer(String username, String password);

    /**
     * Seller登录
     *
     * @param username
     * @param password
     * @return
     */
    ResponseEntity<?> loginSeller(String username, String password);
}
