package com.netease.yinanmall.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author yinan
 */
@Document
@Setter
@Getter
@NoArgsConstructor
public class CartItem {
    @Id
    private String cartItemId;

    private String title;

    private Integer count;

    private Double perPrice;

    private Double totalPrice;
}
