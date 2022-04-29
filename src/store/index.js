/*
 * @Descripttion: 
 * @version: v1.0
 * @Author: wentan
 * @Date: 2021-03-31 17:39:04
 * @LastEditors: went
 * @LastEditTime: 2022-04-28 11:13:48
 */
import Vue from 'vue'
import vuex from 'vuex'
import app from './modules/app.js'
import addRoutes from './modules/addRoutes'
import dragForm from './modules/dragForm'
import createPersistedState from 'vuex-persistedstate'
Vue.use(vuex);

const store = new vuex.Store({
  modules: {
    app: app,
    addRoutes: addRoutes,
    dragForm: dragForm
  },


  plugins: [createPersistedState({
    storage: window.sessionStorage,
    //加入要持久化的vuex模块
    reducer(val) {
      return {
        app: val.app,
        addRoutes: val.addRoutes,
        dragForm: val.dragForm
      }
    }
  })]

})
export function setupStore() {
  store.dispatch('addRoutes/loadLocalLogin')
}
export default store