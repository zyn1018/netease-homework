package com.netease.yinanmall.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author yinan
 */
public interface ImageService {

    /**
     * 上传图片
     *
     * @param imageFile
     * @param productId
     * @return
     */
    ResponseEntity<?> saveImage(MultipartFile imageFile, String productId);

    /**
     * 根据商品id获取对应的图片文件
     *
     * @param productId
     * @return
     */
    ResponseEntity<?> getImageByProductId(String productId);

    /**
     * 获取所有商品的图片文件
     *
     * @return
     */
    ResponseEntity<?> getImageList();

    /**
     * 根据商品id删除对应的图片文件
     *
     * @param productId
     * @return
     */
    ResponseEntity<?> deleteImageByProductId(String productId);
}
