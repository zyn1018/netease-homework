package com.netease.yinanmall.dao;

import com.netease.yinanmall.pojo.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author yinan
 */
public interface ImageRepository extends MongoRepository<Image, String> {
    Image findImageByProductId(String productId);

    void deleteImageByProductId(String productId);
}
