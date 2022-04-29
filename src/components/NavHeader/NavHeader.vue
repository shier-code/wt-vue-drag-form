<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-21 14:32:20
 * @LastEditors: went
 * @LastEditTime: 2021-12-21 15:18:28
-->
<template>
  <div class="nav-header">
    <span class="nav-header-title"> {{SYS_TITLE}}</span>
  </div>
</template>
 
<script>
import { SYS_TITLE } from '@/config/global-constant.js'
export default {
  name: '',
  components: {},
  data() {
    return {
      SYS_TITLE
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
 
<style scoped lang = "less">
.nav-header {
  .nav-header-title {
    font-size: 28px;
    padding-left: 16px;
    font-family: "微软雅黑";
    font-weight: 500;
    text-align: LEFT;
    color: #303233;
  }
}
</style>