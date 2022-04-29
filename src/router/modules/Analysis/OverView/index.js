/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-22 17:07:38
 * @LastEditors: went
 * @LastEditTime: 2022-03-08 14:18:57
 */
const OverView = () => import("@/views/Analysis/OverView/index.vue")

export default {
  path: 'Analysis/OverView',
  name: 'OverView',
  component: OverView,
  children: [],
  meta: {
    id: '01_02',
    icon: '03_01',
    isHideRoute: true
  }
};
