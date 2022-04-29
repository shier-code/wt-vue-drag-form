/*
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-18 10:26:59
 * @LastEditors: went
 * @LastEditTime: 2021-12-29 14:43:07
 */
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
  ],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
      ...prodPlugins
    ] // `style: true` 会加载 less 文件
  ]
};