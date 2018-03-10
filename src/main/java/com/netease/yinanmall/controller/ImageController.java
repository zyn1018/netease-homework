package com.netease.yinanmall.controller;

import com.netease.yinanmall.db.ImageRepository;
import com.netease.yinanmall.pojo.Image;
import com.netease.yinanmall.pojo.Seller;
import com.netease.yinanmall.utils.Const;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
public class ImageController {
    private final ImageRepository imageRepository;

    private static final String imageCachePath = "frontend/src/assets/image_cache/";
    private static final String imageExtension = ".jpg";

    @Autowired
    public ImageController(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
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
        try {
            Seller seller = (Seller) session.getAttribute(Const.CURRENT_SELLER);
            if (seller == null) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                if (imageFile != null && productId != null && productId.length() > 0) {
                    Image image = this.imageRepository.findImageByProductId(productId);
                    if (image != null) {
                        this.imageRepository.delete(image);
                        image = new Image();
                        image.setProductId(productId);
                        image.setImageFile(new Binary(imageFile.getBytes()));
                    } else {
                        image = new Image();
                        image.setProductId(productId);
                        image.setImageFile(new Binary(imageFile.getBytes()));
                    }
                    this.imageRepository.save(image);
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
        try {
            if (productId != null && productId.length() > 0) {
                Image image = this.imageRepository.findImageByProductId(productId);
                if (image == null) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                } else {
                    File file = new File(imageCachePath + image.getProductId() + imageExtension);
                    if (!file.exists()) {
                        File dir = new File(file.getParent());
                        if (!dir.exists()) {
                            dir.mkdirs();
                        }
                        file.createNewFile();
                    }
                    FileOutputStream fileOutputStream = new FileOutputStream(file);
                    BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
                    bufferedOutputStream.write(image.getImageFile().getData());
                    bufferedOutputStream.close();
                    fileOutputStream.close();
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 获取所有的商品图片文件
     *
     * @return
     */
    @RequestMapping(value = "/get_all_images", method = RequestMethod.GET)
    public ResponseEntity<?> getAllImages() {
        try {
            List<Image> imageList = this.imageRepository.findAll();
            if (imageList == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                for (Image image : imageList) {
                    File file = new File(imageCachePath + image.getProductId() + imageExtension);
                    if (!file.exists()) {
                        File dir = new File(file.getParent());
                        if (!dir.exists()) {
                            dir.mkdirs();
                        }
                        file.createNewFile();
                    }
                    FileOutputStream fileOutputStream = new FileOutputStream(file);
                    BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
                    bufferedOutputStream.write(image.getImageFile().getData());
                    bufferedOutputStream.close();
                    fileOutputStream.close();
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
            if (productId != null && productId.length() > 0) {
                Image image = this.imageRepository.findImageByProductId(productId);
                if (image != null) {
                    this.imageRepository.deleteImageByProductId(productId);
                    return new ResponseEntity(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
