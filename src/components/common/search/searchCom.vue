<!--
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-10-08 14:02:38
 * @LastEditors: JiaLe
 * @LastEditTime: 2021-10-13 10:45:54
-->
<template>
  <div id="jl-search-com">
    <a-form-model
      class="jl-form"
      ref="ruleForm"
      :label-col="formLayout.labelCol"
      :wrapper-col="formLayout.wrapperCol"
      :model="form"
      :rules="rules"
    >
      <a-row>
        <!-- @slot 搜索字段 -->
        <slot />
        <!-- 按钮 -->
        <a-col
          :span="3"
          :offset="1"
          style="float:right"
        >
          <a-form-model-item
            label=""
            style="float:right"
            :colon="false"
            :labelCol="{ span: 0 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-button
              type="primary"
              @click="submitSearch"
            >
              查询
            </a-button>
            <a-button
              style="margin-left: 10px;"
              @click="resetForm()"
            >
              重置
            </a-button>
            <a
              class="jl-is-more"
              @click="expendToggle"
              v-if="isMore"
              style="margin-left: 10px;"
            >{{expend?'展开':'收起'}}</a>
          </a-form-model-item>
        </a-col>
      </a-row>
      <!-- @slot 更多搜索字段 -->
      <a-row v-if='!expend'>
        <slot
          name="more"
          v-if="isMore"
        />
      </a-row>
    </a-form-model>
  </div>
</template>
 
<script>
export default {
  name: 'SearchCom',
  components: {},
  props: {
    //是否显示更多
    isMore: {
      type: Boolean,
      default: false
    },
    //表单对象
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    //表单布局
    formLayout: {
      type: Object,
      default() {
        return {
          labelCol: { span: 8 },
          wrapperCol: { span: 16 }
        }
      }
    },
    //校验规则
    rules: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      expend: false //展示更多
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    //是否展示更多
    expendToggle() {
      this.expend = !this.expend
    },
    // 查询
    submitSearch(e) {
      e.preventDefault()
      const formData = this.$refs.ruleForm.model
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          for (let x in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, x)) {
              if (typeof formData[x] === 'string') {
                formData[x] = formData[x].trim()
              }
            }
          }
          this.$emit('handleSearch', formData)
        } else {
          console.log('error')
          return false
        }
      })
    },
    //重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
 
<style scoped lang = "less">
#jl-search-com {
  margin: 15px 25px 15px 25px;
  background: #fafafa;
  /* background: red; */
  .jl-form {
    padding: 15px 15px 0 15px;
  }
  .jl-is-more {
    -webkit-touch-callout: none;

    -webkit-user-select: none;

    -khtml-user-select: none;

    -moz-user-select: none;

    -ms-user-select: none;

    user-select: none;
  }
}
</style>