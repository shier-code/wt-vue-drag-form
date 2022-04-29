/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-04-27 15:14:37
 * @LastEditors: went
 * @LastEditTime: 2022-04-29 15:53:18
 */
export default [
  {
    title: '单行文本',
    type: 'InputCpn',
    icon: 'danhangwenben',
    value: '',
    options: {
      label: '单行文本',
      placeholder: ''
    },
    id: '1',
    name: "默认组件"
  },
  {
    title: '单选',
    type: 'SelectCpn',
    code: '1',
    icon: 'danxuankuang',
    value: '',
    options: {
      label: '单选',
      width: '100%',
      required: false,
      disabled: false,
      defaultValue: '',
      option: [
        {
          value: '值1',
          label: '选项1'
        },
        {
          value: '值2',
          label: '选项2'
        },
        {
          value: '值3',
          label: '选项3'
        }
      ]
    },
    id: '2'
  }
]