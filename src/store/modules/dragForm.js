/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-04-28 11:11:01
 * @LastEditors: went
 * @LastEditTime: 2022-04-29 09:35:45
 */
export default {
    namespaced: true,
    state: {
        formList: []
    },
    getters: {
    },
    mutations: {
        updateFormList(state, value) {
            state.formList = value
        }
    },
    actions: {
        setFormList({ commit }, value) {
            commit('updateFormList', value)
        }
    }
}