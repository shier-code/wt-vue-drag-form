/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-01 14:32:01
 * @LastEditors: went
 * @LastEditTime: 2021-12-29 11:32:55
 */

import { baseUrl } from '@/utils/global'

export default {
  method: 'post',
  // 基础url前缀
  baseUrl: baseUrl,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    token: ''
  },
  // 参数
  data: {
    // version:"0.2.0",
    // alias:"web"
  },
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
}