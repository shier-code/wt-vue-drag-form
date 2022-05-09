<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-04-25 11:16:31
 * @LastEditors: went
 * @LastEditTime: 2022-05-09 11:42:53
-->
<template>
  <div class="wt-form-app">
    <div v-if="formItem.type==='InputCpn'">
      <label
        v-if="formItem.options"
        for=""
      >{{formItem.options.label}}</label>
      <a-input :placeholder="formItem.options.placeholder" />
    </div>
    <div v-if="formItem.type==='SelectCpn'">
      <label for="">{{formItem.options.label}}</label>
      <a-select style="width: 120px">
      </a-select>
    </div>

  </div>
</template>
 
<script>
export default {
  name: '',
  components: {},
  props: {
    formItem: {
      type: Object
    }
  },

  data() {
    return {

    } 
  },
  computed: {

  },
  created() {
  },
  mounted() {

  },
  methods: {

  }
}
</script>
 
<style scoped lang = "less">
.wt-form-app {
  width: 100px;
}
</style>