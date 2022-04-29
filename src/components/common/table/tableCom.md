<!--
 * @Descripttion:
 * @version:
 * @Author: JiaLe
 * @Date: 2021-10-08 15:49:52
 * @LastEditors: JiaLe
 * @LastEditTime: 2021-10-09 17:04:21
-->

<TableCom
@sizeChange='sizeChange' //分页变化监听回调 {current:页码,pageSize:每页显示数量}
:pageOption='pagination' //分页配置属性
:tableData="tableData" //表格数据
:tableColumn="tableColumn" //表头配置
:loading="isLoading" //加载状态
:rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" //selectRowKeys:选中行数据；onchange：选中回调>

//动态插槽 <template #[插槽名:与表头配置的 key 一致]="{操作行数据}"></template>
<template #aiAction="{record}">
<a>查看图片</a>
</template>
<template #action="{record}">
<a>查看</a>
</template>

</TableCom>
<script>
  data(){
  return{
       //分页配置
      pagination: {
        total: 0,   //总数据量
        defaultPageSize: 1,  //默认每页显示
        showSizeChanger: true, //每页数量配置选项开关
        showQuickJumper: true, //快速跳转页码开关
        pageSizeOptions: ['1', '2', '15', '20']
      },
      //表格表头
      tableColumn:[]
      //表格数据
      tableData:[],
      //选中Key
      selectedRowKeys: [],
      //加载状态
      isLoading:false
  }
},
computed: {
    //选中数据记录
    recordChange() {
      const rec = []
      this.selectedRowKeys.forEach(el => {
        rec.push(this.tableData[el])
      })
      return rec
    }
  },
methods:{
      //页码回调
    sizeChange(current, pageSize) {
      console.log(current, pageSize)
    },
    //选中数据
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys:', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
      console.log(this.recordChange);
    }
}
</script>
