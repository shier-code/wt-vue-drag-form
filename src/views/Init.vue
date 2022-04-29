<!--
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-23 13:50:56
 * @LastEditors: went
 * @LastEditTime: 2021-12-31 10:29:06
-->
<template>
  <div class="container">
    <a-spin
      size="large"
      :tip="tip"
    >
      <div class="container"></div>
    </a-spin>
  </div>
</template>
 
<script>
import axios from "axios";
import { mapActions } from 'vuex'
import { getQueryString } from "@/utils/util";
import { ENTER_WAY, SYS_TOKEN, SYS_ORGCODE } from '@/config/global-constant.js'

import router from "@/router";
export default {
  name: "init",
  data() {
    return {
      tip: "加载中..."
    };
  },
  created() {
    this.initIdentity();
  },

  mounted() { },
  methods: {
    ...mapActions('addRoutes', ['actionMenu']),
    /**
     * @description:初始化从地址栏获取token,orgCode并存储到session
     * @param {*}
     * @return {*}
     * @author: wentan
     */
    async initIdentity() {
      if (ENTER_WAY === 'portal') {
        sessionStorage.setItem(SYS_TOKEN, getQueryString("token"));
        sessionStorage.setItem(SYS_ORGCODE, getQueryString("orgCode"));
      }
      //获取用户信息
      this.getUserInfo();
    },
    /**
     * @description:初始化鉴权，获取用户信息
     * @param {*}
     * @author: wentan
     */
    async getUserInfo() {
      // 调取接口获取菜单
      axios.post("/public/getUserInfo").then(res => {
        if (res.data.result === true && res.data.code === "200") {
          const menuList = res.data.data.menuList;
          this.actionMenu(menuList)
          //跳转到
          this.$router.push(router.options.routes[0].children[0].path)
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
        } else {
          this.$message.error("获取用户信息失败");
        }
      });
    }
  }
};
</script>
 
<style scoped lang = "less">
.container {
  width: 100%;
  height: 100vh;
}
</style>