/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-10-13 09:51:12
 * @LastEditors: JiaLe
 * @LastEditTime: 2021-10-13 13:57:44
 */
import axios from '../axios'

//图片上传
export const uploadPic = (data) => {
    return axios({
        url: '/public/getUserInfo',
        method: 'post',
        data
    })
}
