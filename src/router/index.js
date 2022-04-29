/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-18 10:26:59
 * @LastEditors: went
 * @LastEditTime: 2021-12-30 14:08:09
 */
import Vue from "vue";
import { Modal } from "ant-design-vue"
import { SYS_TITLE, ENTER_WAY, SYS_TOKEN } from '@/config/global-constant.js'
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"
Vue.use(VueRouter);
//路由重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//路由数据
const routes = [
  {
    path: "/",
    name: "index",
    component: () => import(/* webpackChunkName: "user" */ "../layouts/BasicLayout.vue"),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "user" */ "@/views/Login.vue")
  },
  {
    path: "/init",
    name: "init",
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "user" */ "@/views/Init.vue"),
    children: []
  },
  {
    path: '/403',
    name: '403',
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "user" */ "@/views/403.vue")
  },
  {
    path: '*',
    name: 'notFound',
    hideInMenu: true,
    component: () => import(/* webpackChunkName: "user" */ "@/views/404.vue")

  }
];

//路由实例方法
const createRouter = () => new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

//创建路由实例
const router = createRouter()

//重置路由方法  切换用户后，或者退出时清除动态加载的路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

//路由守卫
router.beforeEach((to, from, next) => {
  Modal.destroyAll();
  //兼容在ie/360浏览器title异常显示
  document.title = SYS_TITLE
  let token = sessionStorage.getItem(SYS_TOKEN);
  if (to.path !== from.path) {
    NProgress.start();
  }
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else if (to.path === '/init') {
    next()
  } else {
    if (!token || token === 'null') {
      if (ENTER_WAY === 'portal') {
        //携带地址栏的token和orgCode跳转到init页面进行初始化
        let href = window.location.href;
        let w = href.slice(href.indexOf('?'))
        next({ path: `/init${w}` })
      } else {
        //跳转到登录界面
        next({ path: '/login' })
      }
    } else {
      next()
    }
  }
});
router.afterEach(() => {
  NProgress.done()
})
export default router;
