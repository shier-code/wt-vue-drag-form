/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-13 14:47:13
 * @LastEditors: went
 * @LastEditTime: 2022-02-15 16:30:33
 */

export function mapMenusToRoutes(userMenus) {
  let routes = [];
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

  let fullMenus = JSON.parse(JSON.stringify(userMenus))
  _recurseGetRouter(fullMenus);
  //3、加入子页面的路由（不与菜单关联的页面路由）
  const hideRoute = allRoutes.filter((route) => route?.meta.isHideRoute);
  let fullRoutes = [...routes, ...hideRoute]
  return { fullRoutes, fullMenus };
}
