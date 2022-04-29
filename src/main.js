/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-18 10:26:59
 * @LastEditors: went
 * @LastEditTime: 2022-03-08 14:33:08
 */
import Vue from "vue"
import App from "./App.vue";
import router from "./router";
import store, { setupStore } from "./store";
import { registerApp } from "./register";
import "@/filters"
import './icon'
import "./mock/mock"
//全局初始化样式
import 'normalize.css/normalize.css'
import "@/assets/css/baseLess.less";
//全局主题色生效
import 'ant-design-vue/dist/antd.less'
Vue.config.productionTip = false;
registerApp(Vue)
setupStore()//动态路由持久化
const app = new Vue({
  router,
  store,
  render: h => h(App)
});
app.$mount("#app")