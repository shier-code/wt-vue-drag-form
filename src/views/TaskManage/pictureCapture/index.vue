<!--
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-10-11 14:21:22
 * @LastEditors: went
 * @LastEditTime: 2022-01-24 09:28:20
-->
<template>
  <div class="jl-pictureCapture">
    <SearchCom
      :form="form"
      :rules="rules"
      :isMore="false"
      @handleSearch="handleSearch"
    >
      <template #default>
        <a-col :span="6">
          <a-form-model-item
            label='任务ID'
            prop="taskId"
          >
            <a-input
              v-model="form.taskId"
              placeholder="请输入任务ID"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label='AI计算类型'>
            <!-- <a-input v-model="form.upLoadStatus" /> -->
            <a-select v-model="form.aiType">
              <a-select-option
                v-for="item in dictionary.aiTypes"
                :key="item.code"
                :value="item.code"
              >
                {{item.name}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label='上传状态'>
            <!-- <a-input v-model="form.upLoadStatus" /> -->
            <a-select v-model="form.upLoadStatus">
              <a-select-option
                v-for="item in dictionary.upLoadStatus"
                :key="item.code"
                :value="item.name"
              >
                {{item.name}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item
            label='图片ID'
            prop="photoId"
          >
            <a-input
              v-model="form.photoId"
              placeholder="请输入图片ID"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item label='任务状态'>
            <a-select v-model="form.taskStatus">
              <a-select-option
                v-for="item in dictionary.taskStatus"
                :key="item.code"
                :value="item.code"
              >
                {{item.name}}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="6">
          <a-form-model-item
            label='执行时间'
            prop="taskTime"
          >
            <a-date-picker
              style="width:100%"
              v-model="form.taskTime"
              @change="getTime"
            />

          </a-form-model-item>
        </a-col>
      </template>
      <template #more>
      </template>
    </SearchCom>
    <TableCom
      @sizeChange='sizeChange'
      :tableData="tableData"
      :tableColumn="tableColumn"
      :pageOption="pagination"
      :isLoading="isLoading"
    >

    </TableCom>
  </div>
</template>
 
<script>
import { getEumnsById, cacheAllPromise } from "@/utils/enums"
// import moment from 'moment'
export default {
  name: 'pictureCapture',
  components: {},
  data() {
    return {
      form: {
        taskId: '', //任务ID
        aiType: '全部', //AI计算类型
        equipmentId: '', //设备ID
        upLoadStatus: '全部', //上传状态
        photoId: '', //图片ID
        taskStatus: '全部', //任务状态
        taskTime: null //任务时间数组

      },
      rules: {},
      //分页配置
      pagination: {
        total: 3,
        defaultPageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      tableData: [],
      tableColumn: [
        {
          title: '任务ID',
          dataIndex: 'taskId',
          key: 'taskId'
        },
        {
          title: '任务状态',
          key: 'taskStatus',
          dataIndex: 'taskStatus',
          // eslint-disable-next-line object-curly-spacing
          customCell: ({ taskStatus }) => { return { style: { "color": taskStatus === "成功" ? "#23BF71" : taskStatus === "失败" ? "#FF5959" : "#F79736" } } }
        },

        {
          title: '执行时间',
          key: 'executTime',
          dataIndex: 'executTime'
        },
        {
          title: '图片ID',
          dataIndex: 'equipmentId',
          key: 'equipmentId'
        },
        {
          title: '附加参数',
          dataIndex: 'otherParam',
          key: 'otherParam'
        },
        {
          title: 'AI计算类型',
          dataIndex: 'aiType',
          key: 'aiType'
        },
        {
          title: 'AI计算结果',
          key: 'aiAction',
          scopedSlots: { customRender: 'aiAction' }
        },
        {
          title: '上传状态',
          key: 'upLoadStatus',
          dataIndex: 'upLoadStatus',
          // eslint-disable-next-line object-curly-spacing
          customCell: ({ upLoadStatus }) => { return { style: { "color": upLoadStatus === "已上传" ? "#23BF71" : "#AAAEB2" } } }
        },
        {
          title: '备注',
          key: 'remark',
          dataIndex: 'remark'
        },

        {
          title: '设备信息',
          key: 'equipmentInfo',
          scopedSlots: { customRender: 'equipmentInfo' }
        }
      ],
      selectedRowKeys: [], //选中数据KEY
      isLoading: false,
      dictionary: {} //查询字典对象
    }
  },
  computed: {
    buttonShow() {
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        return true
      }
      return false
    }
  },
  created() {
    this.baseInit()
    this.getPhotoData()
  },
  mounted() {
  },
  methods: {
    getTime(val) {
      console.log(val)
    },
    //基础配置注入方法
    async baseInit() {
      this.dictionary = await cacheAllPromise([getEumnsById("taskStatus"), getEumnsById("upLoadStatus"), getEumnsById("aiTypes")])
      console.log(this.dictionary)
    },
    //获取视频数据
    async getPhotoData() {
      const result = await this.$api.taskMange.getVideoCollectList()
      if (result.code === "200" && result.data) {
        this.tableData = result.data.list
        this.pagination = {
          ...this.pagination,
          total: result.data.pagination.total,
          pageSize: result.data.pagination.pageSize
        }
      }
    },
    //查询
    handleSearch(val) {
      console.log(val)
    },
    //页码回调
    sizeChange(current, pageSize) {
      console.log(current, pageSize)
    }

  }
}
</script>
 
<style scoped lang = "less">
</style>