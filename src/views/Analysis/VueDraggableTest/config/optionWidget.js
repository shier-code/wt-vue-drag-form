/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-04-27 15:14:37
 * @LastEditors: went
 * @LastEditTime: 2022-05-10 17:23:28
 */
export default [
  {
    id: '1',
    title: '单行文本',
    type: 'InputCpn',
    icon: 'danhangwenben',
    value: '',
    options: {
      field: 'input_1',
      label: '单行文本',
      placeholder: ''
    }
  },
  {
    id: '2',
    title: '单选',
    type: 'SelectCpn',
    code: '1',
    icon: 'danxuankuang',
    value: '',
    options: {
      field: 'select_1',
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
    }

  }
]