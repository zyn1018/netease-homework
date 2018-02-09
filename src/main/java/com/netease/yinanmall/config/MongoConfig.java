package com.netease.yinanmall.config;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * @author yinan
 */
@Configuration
@PropertySource("classpath:application.properties")
@EnableMongoRepositories(basePackages = "com.netease.yinanmall.db")
public class MongoConfig extends AbstractMongoConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Override
    protected String getDatabaseName() {
        return "netease_mall";
    }

    @Override
    public Mongo mongo() throws Exception {
        MongoClientURI uri = new MongoClientURI(mongoUri);
        return new MongoClient(uri);
    }
}
