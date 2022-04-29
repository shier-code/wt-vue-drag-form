<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-24 14:45:49
 * @LastEditors: went
 * @LastEditTime: 2022-04-25 09:34:00
-->
<template>
  <div class="">
    <h2>excel解析</h2>
    <a-upload
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <a-button>
        <a-icon type="upload" /> Select File </a-button>
    </a-upload>
    <div>{{outputs}}</div>
  </div>
</template>
 
<script>
import * as XLSX from 'xlsx'
export default {
  name: '',
  components: {},
  data() {
    return {
      fileList: [],
      outputs: []

    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {

    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      this.readExcel()
      return false
    },
    readExcel() { //表格导入
      var that = this;
      const files = this.fileList;
      if (files.length <= 0) { //如果没有文件名
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: 'binary'
          });
          const wsname = workbook.SheetNames[0];//取第一张表
          // const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
          console.log('ws=====', workbook.Sheets[wsname]);
          that.outputs = [];//清空接收数据
          for (var i = 0; i < ws.length; i++) {
            var sheetData = {
              address: ws[i].__EMPTY,
              value: ws[i].__EMPTY_2
            }
            that.outputs.push(sheetData);
          }
          this.$refs.upload.value = '';
        } catch (e) {
          console.log(e);

          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    }
  }
}
</script>
 
<style scoped lang = "less">
</style>