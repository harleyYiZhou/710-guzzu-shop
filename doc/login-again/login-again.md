## 登陆超时

### 登陆超时

当商家登陆login时，调用API：API：[Auth.signinWithEmail](https://mp-dev.guzzu.cn/mpapi/2/Auth.signinWithEmail)，会生成一个guzzu-sessionId，并保存在cookie中，但该参数20分钟若无操作，便会自动删除，则系统会重新登陆账号。