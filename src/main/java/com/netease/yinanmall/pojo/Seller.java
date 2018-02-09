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
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Seller {
    @Id
    private Integer sellerId;

    private String username;

    private String password;
}
