/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-22 17:07:38
 * @LastEditors: went
 * @LastEditTime: 2021-12-30 15:01:47
 */
const DashBoard = () => import("@/views/Analysis/Dashboard/index.vue")

export default {
  path: 'Analysis/DashBoard',
  name: 'DashBoard',
  component: DashBoard,
  children: [],
  meta: {
    id: '01_01',
    icon: '03_01'
  }
};
