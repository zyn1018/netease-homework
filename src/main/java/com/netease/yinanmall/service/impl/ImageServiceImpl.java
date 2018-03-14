package com.netease.yinanmall.service.impl;

import com.netease.yinanmall.dao.ImageRepository;
import com.netease.yinanmall.pojo.Image;
import com.netease.yinanmall.service.ImageService;
import com.netease.yinanmall.utils.Const;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * @author yinan
 */
@Service("ImageService")
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public ResponseEntity<?> saveImage(MultipartFile imageFile, String productId) {
        if (imageFile != null && productId != null && productId.length() > 0) {
            try {
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
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getImageByProductId(String productId) {
        try {
            if (productId != null && productId.length() > 0) {
                Image image = this.imageRepository.findImageByProductId(productId);
                if (image == null) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                } else {
                    File file = new File(Const.IMAGE_CACHE_PATH + image.getProductId() + Const.IMAGE_EXTENSION);
                    checkFileExists(file);
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

    @Override
    public ResponseEntity<?> getImageList() {
        try {
            List<Image> imageList = this.imageRepository.findAll();
            if (imageList == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                for (Image image : imageList) {
                    File file = new File(Const.IMAGE_CACHE_PATH + image.getProductId() + Const.IMAGE_EXTENSION);
                    checkFileExists(file);
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

    @Override
    public ResponseEntity<?> deleteImageByProductId(String productId) {
        if (productId != null && productId.length() > 0) {
            Image image = this.imageRepository.findImageByProductId(productId);
            if (image != null) {
                this.imageRepository.deleteImageByProductId(productId);
                return new ResponseEntity(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private void checkFileExists(File file) throws IOException {
        if (!file.exists()) {
            File dir = new File(file.getParent());
            if (!dir.exists()) {
                dir.mkdirs();
            }
            file.createNewFile();
        }
    }
}
