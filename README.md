<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-01 14:32:01
 * @LastEditors: went
 * @LastEditTime: 2022-04-29 16:15:29
-->
# vue-base-template-v2.0说明文档

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### 项目结构目录
+ src
  + assets
    + css
      + baseLess.less------(公共css)
      + variable.less------(全局less变量)
    + img
    + fonts
  + common-------------(公共js)
  + components--------(可复用组件)
  + config
    + global-constant.js-------(全局常量配置)
  + http------------------(axio网络请求相关)
    + modules--------(组件api)
    + config.js--------(网络请求全局配置)
    + axios.js--------（axios实例化，拦截器相关）
    + api,js-----------(各组件api统一集成)
    + index.js---------(导出所有组件api统一挂载到vue原型的$api对象上)
  + icon
    + svg--------------(svg资源文件)
    + index.js---------(加载所有svg资源文件)
  + router
    + modules----------(路由模块文件，同/views页面文件划分一致)
  + store
  + utils--------------(工具方法)
    + map-menus.js---------------(解析路由文件，根据菜单鉴权生成路由)
  + views
    + OrgAdmin
      + cpns-----------------------(页面组件)
      + index.vue 


### 全局常量配置
```
// src/config/global-constant.js 

//系统title
export const SYS_TITLE = "vue-base-template-v2.0"

//login:系统单独的登录
export const ENTER_WAY = "login"

//配置token和orgCode全局常量
export const SYS_TOKEN = "token"
export const SYS_ORGCODE = "orgCode" 
```
### css初始化
> npm install  normalize.css --save
```

//main.js  

//normalize初始化样式
import 'normalize.css/normalize.css'
//初始化样式
import "@/assets/css/baseLess.less";
```
> 如果引入normalize.css导致Vue 项目报错，可能没有安装css-loader 和style-loader

### 全局less变量配置
```
//定义全局变量
//assets/css/theme.less
@primary-color: #1bb280;
@primary-bg: #dff6ee; //主题色背景

//vue.config.js
module.exports = {
 chainWebpack: (config) => {
    const oneOfsMap = config.module.rule("less").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("style-resources-loader")
        .loader("style-resources-loader")
        .options({
          patterns: "./src/assets/css/theme.less"
        })
        .end();
    });
 }
}
```
### 组件/插件全局注册
```
//以全局注册svg-icon组件为例
//src/register/register-components.js
import svgIcon from "@components/common/svgIcon.vue";
export default function (Vue) {
  Vue.component("svgIcon", svgIcon);
}

//src/register/index.js 统一导出
import registerAntd from "./register-antdv";
import registerApi from "./register-api";
import registerComponents from "./register-components";
export function registerApp(vue) {
  registerAntd(vue);
  registerApi(vue);
  registerComponents(vue);
}
//main.js
registerApp()
```
### antd按需引入
+ 安装antd
+ 安装babel-plugin-import插件实现按需加载
+ 配置babel.config.js文件
```
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
```

+ 按需引入
```
//register-antdv.js
import { Button } from 'ant-design-vue';
Vue.component(Button.name, Button);
```
### 动态路由 
+ 根据页面文件views的结构创建路由模块文件（可通过工具生成）
> npm i coderwhy -g
> coderwhy addpagerouter OrgAdmin -d src/views/OrgAdmin
+ 解析所有路由
```  
  
  //1、先加载默认所有routes
  const allRoutes = [];
  const routeFiles = require.context("../router/modules", true, /\.js/);
  //获取到路由文件路径：key =>  ./Analysis/DashBoard/index.js
  routeFiles.keys().forEach((key) => {
    const route = require("../router/modules" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  
  //2、根据菜单获取需要添加的routes
  const _recurseGetRouter = (menus) => {
    menus.forEach(menu => {
      if (menu.children && menu.children.length) {
        _recurseGetRouter(menu.children);
      } else {
        const route = allRoutes.find((route) => route?.meta.id === menu.id);
        if (route) {
          routes.push(route);
          menu.path = route.path
          menu.name = route.name
        }
      }
    })
  };
  //3、加入子页面的路由（不与菜单关联的页面路由）
  const hideRoute = allRoutes.filter((route) => route?.meta.isHideRoute);
  let fullRoutes = [...routes, ...hideRoute]
```
+ 生成完整菜单（icon,path）,动态添加路由
```
   //src/store/addRoutes.js

   //mutations
    changeUserMenus(state, userMenus) {
      //通过菜单生成拥有完整属性的路由和菜单
      let { fullRoutes, fullMenus } = mapMenusToRoutes(userMenus);
      //菜单数据赋值
      state.fullMenus = fullMenus;
      //动态添加路由  新API addRoute vue-router v3.5.3 可用
      fullRoutes.forEach((route) => {
        router.addRoute('index', route);
      });
      //由于addRoute动态添加路由，router.options.routes数据不会更新，故手动添加
      router.options.routes[0].children = router.options.routes[0].children.concat(
        fullRoutes
      );
    }
```
### 网络请求封装
#####   结构说明
+ http
  + modules 
    + page1.js 
  + config.js--------(网络请求全局配置)
  + axios.js--------（axios实例化，拦截器相关）
  + api,js-----------(各组件api统一集成)
  + index.js---------(导出所有组件api统一挂载到vue原型的$api对象上)
+ 网络请求全局配置
```
//config.js
import { baseUrl } from '@/Utils/global'

export default {
  method: 'post',
  // 基础url前缀
  baseUrl: baseUrl,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    token: ''
  },
  // 参数
  data: {
    // version:"0.2.0",
    // alias:"web"
  },
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
}
```
+ axios实例化，拦截器相关
```
import axios from 'axios';
import config from './config';
import router from '@/router'
import { SYS_TOKEN, SYS_ORGCODE } from '@/config/global-constant'
// 使用vuex做全局loading时使用
// import store from '@/store'
export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        const token = sessionStorage.getItem(SYS_TOKEN);
        const orgCode = sessionStorage.getItem(SYS_ORGCODE);
        config.headers.token = token
        config.headers.orgCode = orgCode

        //没有任何参数时，构建空data对象，统一入参格式
        if (!config.data.data) {
          config.data.data = {}
        }
        return config
      },
      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        if (errorInfo) {
          error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          // const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            name: "404"
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )
    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          //对返回的文件流包装处理
          if (options.responseType === "blob") {
            data = {
              blob: response.data,
              headers: response.headers
            }
          } else { data = response.data }
        }

        // 根据返回的code值来做不同的处理
        switch (data.code) {
          case 1:
            //do sth
            break;
          case 0:
            //do sth
            break;
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err

        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        console.error(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance({
      ...options,
      data: {
        ...config.data,
        data: options.data
      }
    }).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
```
+ 网络请求模块调用axios实例
```

import axios from '../axios'
//图片上传
export const uploadPic = (data) => {
    return axios({
        url: '/public/getUserInfo',
        method: 'post',
        data
    })
}
```
+ 各组件api统一集成并导出
```
//api.js
import * as init from './modules/init'
export default {init}
```
+ 导出所有组件api统一挂载到vue原型的$api对象上
```
//index.js
// 导入所有接口
import api from './api'

const install = Vue => {
    if (install.installed) { return; }

    install.installed = true;
    Object.defineProperties(Vue.prototype, {
        // 注意，此处挂载在 Vue 原型的 $api 对象上
        $api: {
            get() {
                return api
            }
        }
    })
}

export default install
```