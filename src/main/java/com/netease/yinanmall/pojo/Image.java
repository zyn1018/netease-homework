package com.netease.yinanmall.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author yinan
 */
@Document
@Setter
@Getter
@NoArgsConstructor
public class Image {

    @Id
    private String imageId;

    private String productId;

    private Binary imageFile;

}
