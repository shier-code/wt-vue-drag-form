<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-05-10 15:32:42
 * @LastEditors: went
 * @LastEditTime: 2022-05-10 15:36:15
-->
<template>
  <div class="">
    <a-form-model-item :label="propsData.options.label">
      <a-input
        :placeholder="propsData.options.placeholder"
        v-model="propsData.options.label"
      />
    </a-form-model-item>
  </div>
</template>
 
<script>
export default {
  name: '',
  components: {},
  props: {
    propsData: {
      type: Object
    }
  },
  data() {
    return {

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
</style>