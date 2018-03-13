# 内容销售系统

#### 系统有两类用户，买家和卖家，系统只有一个卖家和一个买家，用户的账号由后台直接注入，不由本系统的功能来注册和维护。卖家可以发布内容，为内容定价，查看购买情况。买家可以浏览已发布的内容摘要，选择购买，查看已购买的内容。

## 前端
+ Angular 5

## 后端
+ Spring Boot
+ MongoDB

## How to Run
#### 从项目根路径下开始
#### 1. mvn spring-boot:run
#### 2. cd frontend/
#### 3. npm install(如果报错，请更新node版本)
#### 4. npm start

## 部分截图
#### 1. 未登录主页
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/Homepage.png)

#### 2. 登录界面
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/LoginPage.png)

#### 3. Buyer登录后主页
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerHome.png)

#### 4. Seller登陆后主页
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/sellerHome.png)

#### 5. Buyer查看未购买商品
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerUnbought.png)

#### 6. Buyer查看购买记录
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerHistory.png)

#### 7. 购物车
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerCart.png)

#### 8. Buyer查看商品详情
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/buyerDetail.png)

#### 9. Seller查看商品详情
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/sellerDetail.png)

#### 10. Seller发布新商品
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/sellerPublish.png)

#### 11. Seller编辑商品
![](https://github.com/zyn1018/netease-homework/blob/master/ScreenShots/sellerEdit.png)
