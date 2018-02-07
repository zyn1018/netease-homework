package com.netease.yinanmall;

import com.netease.yinanmall.config.MongoConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = MongoConfig.class)
@SpringBootTest
public class YinanmallApplicationTests {
    @Test
    public void contextLoads() {
    }
}
