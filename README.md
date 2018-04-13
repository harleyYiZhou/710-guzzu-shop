# GUZZU-SHOP开发文档

##  页面Pages

### 一、login(登陆)

1. 商家登陆。API：[Auth.signinWithEmail](https://mp-dev.guzzu.cn/mpapi/2/Auth.signinWithEmail)
2. 选择语言。

### 二、scan（主页：获取电子券信息）

1. 扫描二维码和输入券码。API：[UserTicket.get](https://mp-dev.guzzu.cn/mpapi/2/UserTicket.get)
2. 核销。API：[UserTicket.consume](https://mp-dev.guzzu.cn/mpapi/2/UserTicket.consume)
3. 登出。API：[Auth.signout](https://mp-dev.guzzu.cn/mpapi/2/Auth.signout)

### 三、checkout（电子券详细信息）

1. 得到票券信息。API：[UserTicket.get](https://mp-dev.guzzu.cn/mpapi/2/UserTicket.get)
2. 得到购买者信息。API：[Customer.getByUserId](https://mp-dev.guzzu.cn/mpapi/2/Customer.getByUserId)
3. 核销。API：[UserTicket.consume](https://mp-dev.guzzu.cn/mpapi/2/UserTicket.consume)

### 四、complete-check（核销完成页面）

1. 若核销完成跳转至该页面，并回到主页scan

### 五、login-again（重新登陆）

1. [登陆超时](./doc/login-again/login-again.md)
2. 登陆其他账号。


##  utils工具类

### 一、translate.js（[多语言转换](./utils/translate.js)）

### 二、[util.js](./utils/util.js)

1. checkLogin 检查登陆
2. callApi ajax请求封装
3. formatTime 时间戳转换

## GUZZU API

1. [GUZZU API v2 文档](https://dev.guzzu.cn/guzzu-doc/api2/)

2. [GUZZU MPAPI v2 文档](https://dev.guzzu.cn/guzzu-doc/mpapi2/)

## 使用文档

1. [user.md](user.md)