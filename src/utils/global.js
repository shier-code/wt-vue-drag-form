/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-18 10:26:59
 * @LastEditors: went
 * @LastEditTime: 2022-01-17 13:34:26
 */
/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */
// 后台管理系统服务器地址
let baseUrl = "";
let socketUrl = "";
let originUrl = "";
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://10.20.5.35:3000/mock/1273/';
} else if (process.env.NODE_ENV === 'debug') {
  baseUrl = '';
} else if (process.env.NODE_ENV === 'production') {
  if (window.G.productionUrl && window.G.socketUrl) {
    //1、预留静态文件配置入口
    baseUrl = window.G.productionUrl;
    socketUrl = window.G.socketUrl;
  } else {
    //2、通过location动态获取
    if (!window.location.origin) {
      //兼容IE
      window.location.origin =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
    }
    let origin = window.location.origin;
    originUrl = origin + "/oss/"
    let port = window.location.port ? `:${window.location.port}` : `:10002`;
    baseUrl = `${origin}/service/isbm`;
    socketUrl = `ws://${window.location.hostname}${port}`;
  }
}
export { baseUrl, socketUrl, originUrl };