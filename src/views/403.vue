<!--
 * @Author: ylc
 * @Date: 2021-12-28 13:39:35
 * @LastEditTime: 2022-02-25 10:52:18
 * @LastEditors: went
 * @Description: 
 * @FilePath: \校本选课v1.0\src\views\403.vue
-->
<template>
  <div class="errPage-container">
    <div class="ylc-403-div">
      <img :src="errGif"
        width="100%">
      <div class="ylc-403-bottom">您暂时无权限，请联系管理人员！</div>
    </div>
  </div>
</template>

<script>
import errGif from '@/assets/img/401.png'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    backback() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/adminSystem' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.errPage-container {
  .ylc-403-div {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
  }
  .ylc-403-bottom {
    position: relative;
    top: -80px;
    font-size: 14px;
    color: #616466;
    font-weight: 400;
    letter-spacing: 0.07px;
  }
}
</style>
