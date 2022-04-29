/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-22 17:07:38
 * @LastEditors: went
 * @LastEditTime: 2022-04-25 09:45:56
 */
const OverView = () => import("@/views/Analysis/VueDraggableTest/Index.vue")

export default {
  path: 'Analysis/VueDraggableTest',
  name: 'VueDraggableTest',
  component: OverView,
  children: [],
  meta: {
    id: '01_03',
    icon: '03_01',
    isHideRoute: true
  }
};
