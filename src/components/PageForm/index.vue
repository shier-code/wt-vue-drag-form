<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-01-07 10:31:18
 * @LastEditors: went
 * @LastEditTime: 2022-01-07 16:12:17
-->
<template>
  <div class="page-form">
    <jf-form
      v-bind="searchFormConfig"
      v-model="formData"
      @updateformData="updateformData"
    >
      <template #operation>
        <div class="handle-btns">
          <a-button
            type="primary"
            @click="handSubmit"
          >提交</a-button>
        </div>
      </template>
    </jf-form>
  </div>
</template>
 
<script>
import JfForm from './src/Form'
export default {
  name: '',
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  components: { JfForm },
  data() {
    return {
      formData: {}
    }
  },
  computed: {

  },
  created() {
    this.initFormData()
  },
  methods: {
    initFormData() {
      const formItems = this.searchFormConfig?.formItems || []
      const formOriginData = {}
      for (const item of formItems) {
        formOriginData[item.field] = ''
      }
      this.formData = formOriginData
    },
    updateformData(val) {
      this.formData = val
    },
    handSubmit() {
      console.log('formData===', this.formData);
    }
  }
}
</script>
 
<style scoped lang = "less">
</style>