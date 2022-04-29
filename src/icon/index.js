/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-01 14:32:01
 * @LastEditors: went
 * @LastEditTime: 2022-02-10 11:24:52
 */


const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
