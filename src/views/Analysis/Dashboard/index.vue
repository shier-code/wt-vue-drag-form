<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-22 16:57:47
 * @LastEditors: went
 * @LastEditTime: 2022-04-25 14:58:07
-->
<template>
  <div class="dashboard">
    Dashboard
    <svg-icon icon-class='light'></svg-icon>
    <page-form :searchFormConfig="searchFormConfig"></page-form>

  </div>
</template>
 
<script>
import PageForm from '@/components/PageForm/index.vue'
import { searchFormConfig } from '../config/search.config.js'

export default {
  name: '',
  components: { PageForm },
  data() {
    return {
      searchFormConfig
    }
  },
  computed: {

  },
  mounted() {
    console.log('999');
  },
  methods: {

  }
}
</script>
 
<style scoped lang = "less">
.dashboard {
  color: @primary-color;
}
</style>