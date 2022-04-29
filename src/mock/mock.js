/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-10-13 10:56:50
 * @LastEditors: went
 * @LastEditTime: 2021-12-21 15:46:16
 */


import { getUserInfo, login } from "./mockData/baseInfo"

const Mock = require('mockjs')

const mockArr = [
  getUserInfo,
  login
]

mockArr.forEach(({ url, method, response }) => {
  Mock.mock(url, method, response)
})