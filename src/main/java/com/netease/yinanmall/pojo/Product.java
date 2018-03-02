package com.netease.yinanmall.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author yinan
 */
@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    private String productId;

    private String title;

    private String imgUrl;

    private Double price;

    private String introduction;

    private String detail;

    private Boolean bought;

    private Integer soldNumber;
}
