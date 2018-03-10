package com.netease.yinanmall.db;

import com.netease.yinanmall.pojo.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageRepository extends MongoRepository<Image, String> {
    Image findImageByProductId(String productId);

    void deleteImageByProductId(String productId);
}
