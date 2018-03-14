package com.netease.yinanmall.controller;

import com.netease.yinanmall.pojo.Seller;
import com.netease.yinanmall.service.ImageService;
import com.netease.yinanmall.utils.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

/**
 * @author yinan
 */
@RestController
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    /**
     * 存入新上传的图片文件
     *
     * @param imageFile
     * @param productId
     * @param session
     * @return
     */
    @RequestMapping(value = "/save_image/{productId}", method = RequestMethod.POST)
    public ResponseEntity<?> saveImage(@RequestParam("image") MultipartFile imageFile, @PathVariable String productId, HttpSession session) {

        Seller seller = (Seller) session.getAttribute(Const.CURRENT_SELLER);
        if (seller == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return this.imageService.saveImage(imageFile, productId);
        }

    }

    /**
     * 根据productId得到对应的商品图片文件
     *
     * @param productId
     * @return
     */
    @RequestMapping(value = "/get_image/{productId}", method = RequestMethod.GET)
    public ResponseEntity<?> getImageByProductId(@PathVariable String productId) {
        return this.imageService.getImageByProductId(productId);
    }

    /**
     * 获取所有的商品图片文件
     *
     * @return
     */
    @RequestMapping(value = "/get_all_images", method = RequestMethod.GET)
    public ResponseEntity<?> getAllImages() {
        return this.imageService.getImageList();
    }

    /**
     * 根据productId删除单件物品的图片文件
     *
     * @param productId
     * @param session
     * @return
     */
    @RequestMapping(value = "/delete_image/{productId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteImageByProductId(@PathVariable String productId, HttpSession session) {
        Seller seller = (Seller) session.getAttribute(Const.CURRENT_SELLER);
        if (seller == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            return this.imageService.deleteImageByProductId(productId);
        }
    }
}
