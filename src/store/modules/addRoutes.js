/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-01 14:32:01
 * @LastEditors: went
 * @LastEditTime: 2021-12-31 10:20:27
 */


/**
 * 动态添加路由
 * author:qlx
 */
import { mapMenusToRoutes } from "@/utils/map-menus";
import router from "@/router";
const addRoutes = {
  namespaced: true,
  state: {
    selectedKeys: [], //选中项
    openKeys: [], //展开项
    fullMenus: []
  },
  getters: {
    getSelectKeys({ selectedKeys }) {
      return selectedKeys
    },
    getOpenKeys({ openKeys }) {
      return openKeys
    }
  },
  mutations: {
    setSelectKeys(state, data) {
      state.selectedKeys = data
    },
    setOpenKeys(state, data) {
      state.openKeys = data
    },
    /**
     * 
     * @param {*} state 
     * @param {*} userMenus  从接口获取到的用户菜单信息（不含path,icon）
     */
    changeUserMenus(state, userMenus) {
      //通过菜单生成拥有完整属性的路由和菜单
      let { fullRoutes, fullMenus } = mapMenusToRoutes(userMenus);
      state.fullMenus = fullMenus;

      fullRoutes.forEach((route) => {
        router.addRoute('index', route);
      });
      //由于addRoute动态添加路由，router.options.routes数据不会更新，故手动添加
      router.options.routes[0].children = router.options.routes[0].children.concat(
        fullRoutes
      );
      console.log('router===', router);
    }
  },
  actions: {
    actionMenu({ commit }, userMenus) {
      commit("changeUserMenus", userMenus);
      sessionStorage.setItem('userMenus', JSON.stringify(userMenus))
    },
    loadLocalLogin({ commit, dispatch }) {
      // const token = localCache.getCache('token')
      // if (token) {
      //   commit('changeToken', token)
      //   // 发送初始化的请求(完整的role/department)
      //   dispatch('getInitialDataAction', null, { root: true })
      // }
      // const userInfo = localCache.getCache('userInfo')
      // if (userInfo) {
      //   commit('changeUserInfo', userInfo)
      // }
      const userMenus = JSON.parse(sessionStorage.getItem('userMenus'))
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default addRoutes