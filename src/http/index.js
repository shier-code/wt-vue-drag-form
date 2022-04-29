/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-10-13 09:51:12
 * @LastEditors: JiaLe
 * @LastEditTime: 2021-10-13 15:35:39
 */
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