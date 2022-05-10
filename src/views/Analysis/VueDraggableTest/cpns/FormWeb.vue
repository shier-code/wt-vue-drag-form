<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-04-25 11:16:31
 * @LastEditors: went
 * @LastEditTime: 2022-05-10 15:54:12
-->
<template>
  <div class="wt-form-web">
    <a-form-model
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <component
        :is="formItem.type"
        :propsData="formItem"
      ></component>
    </a-form-model>
  </div>
</template>
 <script>
import InputCpn from './FormCtrl/InputCtrl'
import SelectCpn from './FormCtrl/SelectCtrl'
export default {
  name: '',
  components: { InputCpn, SelectCpn },
  props: {
    formItem: {
      type: Object
    }
  },

  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 }
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
</style>