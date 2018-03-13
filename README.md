# 内容销售系统

#### 系统有两类用户，买家和卖家，系统只有一个卖家和一个买家，用户的账号由后台直接注入，不由本系统的功能来注册和维护。卖家可以发布内容，为内容定价，查看购买情况。买家可以浏览已发布的内容摘要，选择购买，查看已购买的内容。

## 前端
+ Angular 5

## 后端
+ Spring Boot
+ MongoDB

## How to Run
#### 从项目根路径下开始
#### 1. `mvn spring-boot:run`
#### 2. `cd frontend/`
#### 3. `npm install`
#### 4. `npm start`
##### (如果步骤3，4中报错, 请更新node版本, https://nodejs.org/en/download/)

## 部分截图
#### 1. 未登录主页
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/Homepage.png)

#### 2. buyer登录界面
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyer_login.png)

#### 3. seller登录界面
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/seller_login.png)

#### 4. Buyer登录后主页
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerHome.png)

#### 5. Seller登陆后主页
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/sellerHome.png)

#### 6. Buyer查看未购买商品
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerUnbought.png)

#### 7. Buyer查看购买记录
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerHistory.png)

#### 8. 购物车
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerCart.png)

#### 9. Buyer查看商品详情
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerDetail.png)

#### 10. Seller查看商品详情
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/sellerDetail.png)

#### 11. Seller发布新商品
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/seller_publish.png)

#### 12. Seller编辑商品
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/seller_edit.png)
