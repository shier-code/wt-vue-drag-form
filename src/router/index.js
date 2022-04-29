/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-18 10:26:59
 * @LastEditors: went
 * @LastEditTime: 2022-04-29 16:26:20
 */
import Vue from "vue";
import { Modal } from "ant-design-vue"
import { SYS_TITLE } from '@/config/global-constant.js'
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
    component: () => import(/* webpackChunkName: "user" */ "@/views/Analysis/VueDraggableTest/Index.vue"),
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

  if (to.path !== from.path) {
    NProgress.start();
  }
  next()
});
router.afterEach(() => {
  NProgress.done()
})
export default router;
