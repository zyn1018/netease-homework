package com.netease.yinanmall.pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Buyer {
    @Id
    private String buyerId;

    private String username;

    private String password;
}
