/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-14 16:24:48
 * @LastEditors: went
 * @LastEditTime: 2021-12-30 15:01:53
 */
const AlarmMonitor = () => import("@/views/TaskManage/alarmMonitor/index.vue")
export default {
  path: 'TaskManage/alarmMonitor',
  name: 'AlarmMonitor',
  component: AlarmMonitor,
  children: [],
  meta: {
    id: '03_01',
    icon: '03_01'
  }
};
