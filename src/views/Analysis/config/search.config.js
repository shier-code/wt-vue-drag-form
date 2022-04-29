/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-13 15:08:57
 * @LastEditors: went
 * @LastEditTime: 2022-01-07 16:15:09
 */

export const searchFormConfig = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  // layout: 'inline', 
  itemStyle: {
    padding: "10px"
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: "id",
      type: "input",
      label: "id",
      placeholder: "请输入id",
      style: {}
    },
    {
      field: "name",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "realname",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      field: "enable",
      type: "select",
      label: "用户状态",
      placeholder: "请选择用户状态",
      style: {
        // width: '200px'
      },
      options: [
        { title: "启用", value: 1 },
        { title: "禁用", value: 0 }
      ]
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ],
  rules: {
    id: [
      {
        required: true,
        message: "请输入内容",
        trigger: "blur"
      },
      {
        max: 16,
        min: 1,
        message: "请输入1-16个字符",
        trigger: "blur"
      }
    ],
    name: [
      {
        required: true,
        message: "请输入内容",
        trigger: "blur"
      }
    ]
  }
};
