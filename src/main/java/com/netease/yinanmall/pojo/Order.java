package com.netease.yinanmall.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Map;

/**
 * @author yinan
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    private String orderId;

    private Double totalPrice;

    private Map<String, Integer> orderDetail;

}
