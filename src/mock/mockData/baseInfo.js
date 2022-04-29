/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-10-13 13:23:33
 * @LastEditors: went
 * @LastEditTime: 2022-04-25 10:46:50
 */
//角色基础信息
const getUserInfo = {
  url: '/public/getUserInfo',
  method: 'post',
  response: {
    result: true,
    code: "200",
    message: "查询成功",
    data: {
      menuList: [
        {
          id: "01",
          title: "二层菜单一",
          children: [
            {
              id: "01_01",
              title: "子菜单一"
            },
            {
              id: "01_02",
              title: "子菜单二"
            },
            {
              id: "01_03",
              title: "两列拖动"
            }
          ]
        }, 
        {
          id: "02",
          title: "一层菜单",
          children: []
        },
        {
          id: "03",
          title: "二层菜单二",
          children: [
            {
              id: "03_01",
              title: "平台开关"
            },
            {
              id: "03_04",
              title: "日志"
            }
          ]
        }
      ]
    },
    version: "v1.00",
    total: 0
  }
};
//登录
const login = {
  url: '/public/login',
  method: 'post',
  response: {
    code: "200",
    data: "749a6f86911e3cf61ec591d074cc81e0",
    message: "登录成功",
    result: true,
    total: 0
  }
};
export { getUserInfo, login }