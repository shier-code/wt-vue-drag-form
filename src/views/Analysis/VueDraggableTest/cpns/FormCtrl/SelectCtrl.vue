<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-05-10 15:32:42
 * @LastEditors: went
 * @LastEditTime: 2022-05-10 15:52:39
-->
<template>
  <div class="">
    <a-form-model-item :label="propsData.options.label">
      <a-select :placeholder="propsData.options.placeholder">
        <a-select-option value="shanghai">
          Zone one
        </a-select-option>
        <a-select-option value="beijing">
          Zone two
        </a-select-option>
      </a-select>
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