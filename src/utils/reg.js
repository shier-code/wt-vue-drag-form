/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-30 11:26:07
 * @LastEditors: went
 * @LastEditTime: 2022-03-08 16:51:18
 */
//邮箱格式 正则
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

//网址格式 正则
const websiteReg = /^(http(s)?:\/\/)?(www\.)?([0-9a-z-]{1,}.)?[0-9a-z-]{2,}.([0-9a-z-]{2,}.)?[a-z]{2,}$/i;
// const websiteReg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;

//密码格式 正则
const passwordReg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*._]+$)[a-zA-Z\d!@#$%^&*._]+$/;

//身份证号格式 正则
const IDNumberReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

//中文姓名 正则
const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;

//座机正则
/* 400电话的正则 /^400[0-9]{7}$/

800电话正则 /^800[0-9]{7}$/

手机号码正则/^1(3|4|7|5|8)([0-9]{9})/

座机号码正则^0[0-9]{2,3}-[0-9]{8}$ 
 */
var landlineReg = /^400[0-9]{7}$|^400-[0-9]{7}$|^400-[0-9]{3}-[0-9]{4}$|^800[0-9]{7}$|^800-[0-9]{7}$|^0[0-9]{2,3}[0-9]{8}$|^0[0-9]{2,3}-[0-9]{8}/;

//通用格式 正则
const generalReg = /^[a-zA-Z0-9!@#$%^&*_\/+-?\u4e00-\u9fa5]+$/;

/**
 * 导出 
 **/
export {
    emailReg, websiteReg, generalReg, passwordReg, IDNumberReg, nameReg, landlineReg
}