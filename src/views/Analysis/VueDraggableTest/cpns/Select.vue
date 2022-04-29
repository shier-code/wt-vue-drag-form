<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-04-28 15:53:47
 * @LastEditors: went
 * @LastEditTime: 2022-04-29 16:03:39
-->
<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item
      ref="name"
      label="控件名称"
      prop="name"
    >
      <a-input v-model="form.label" />
    </a-form-model-item>
    <a-form-model-item
      ref="name"
      label="提示文字"
      prop="name"
    >
      <a-input v-model="form.placeholder" />
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    propsData: {
      type: Object
    }

  },
  computed: {
    ...mapState('dragForm', ['formList'])
  },
  watch: {
    form: {
      handler: function (val) {
        let temp = JSON.parse(JSON.stringify(this.formList))
        temp.forEach((item, index) => {
          if (item.id === this.propsData.id) {
            temp[index].options = this.form
          }
        })
        this.setFormList(temp)
      },
      deep: true
    }
  },

  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        label: '',
        placeholder: ""
      }
    };
  },
  mounted() {
    let temp = JSON.parse(JSON.stringify(this.formList))
    temp.forEach((item, index) => {
      if (item.id === this.propsData.id) {
        this.form = JSON.parse(JSON.stringify(this.propsData.options))
      }
    })
  },
  methods: {
    ...mapActions('dragForm', ['setFormList']),
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>
