/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-18 10:26:59
 * @LastEditors: JiaLe
 * @LastEditTime: 2021-09-24 13:40:04
 */
//过滤
import Vue from 'vue'
import * as filters from "@/filters/filter"

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})