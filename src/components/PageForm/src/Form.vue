<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-01-07 10:32:40
 * @LastEditors: went
 * @LastEditTime: 2022-04-26 13:12:46
-->
<template>
  <div class="form-cpns">
    <a-form-model
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :layout="layout"
      :rules="rules"
    >
      <a-form-model-item
        :label="item.label"
        v-for="(item,index) in formItems"
        :key="index"
        :prop="item.field"
        :style="itemStyle"
      >
        <template v-if="item.type==='input'||item.type==='password'">
          <a-input
            v-model="form[`${item.field}`]"
            :style="item.style"
          />
        </template>
        <template v-else-if="item.type==='select'">
          <a-select
            v-model="form[`${item.field}`]"
            :style="item.style"
          >
            <a-select-option
              v-for="option in item.options"
              :key="option.value"
              :value="option.value"
            >{{option.title}}</a-select-option>
          </a-select>
        </template>
        <template v-else-if="item.type==='datepicker'">
          <a-date-picker
            v-model="form[`${item.field}`]"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </template>
      </a-form-model-item>
      <!-- 操作按钮自定义 -->
      <a-form-model-item>
        <span class="operation-btn">
          <slot name="operation"></slot>
        </span>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
 
<script>
export default {
  name: 'jf-form',
  components: {},
  model: {},
  props: {
    //父组件v-model的值
    value: { type: Object },
    labelCol: {
      type: Object,
      default: () => { return { span: 4 } }
    },
    wrapperCol: {
      type: Object,
      default: () => { return { span: 16 } }
    },
    layout: {
      type: String,
      default: 'horizontal'
    },
    rules: {
      type: Object,
      default: () => { }
    },
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array
    },
    //表单自适应预留
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {

  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.value))//遵从单项数据流
  },
  watch: {
    form: {
      handler(newVal) {
        this.$emit('updateformData', newVal)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {

  }
}
</script>
 
<style scoped lang = "less">
.form-cpns {
  .operation-btn {
    text-align: center;
  }
}
</style>