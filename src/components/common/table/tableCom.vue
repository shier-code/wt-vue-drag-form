<!--
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-10-08 15:48:42
 * @LastEditors: JiaLe
 * @LastEditTime: 2021-12-01 13:53:22
-->
<template>
  <div id="jl-tableCom-table">
    <a-table
      ref="jl-table"
      :columns="tableColumn"
      :data-source="tableData"
      :pagination="pagination"
      :row-selection="rowSelection"
      :rowKey="record=>record.taskId"
      @change='change'
    >
      <template
        v-for="item in actionRender"
        v-slot:[item.key]="record"
      >
        <slot
          :name="item.key"
          :record='record'
        ></slot>
      </template>
    </a-table>
    <div class="jl-tableCom-buttonSolt">
      <slot name="tableButton" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableCom',
  props: {
    //分页配置
    pageOption: {
      type: Object,
      default() {
        return {
          total: 0,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['1', '10', '15', '20']
        }
      }
    },
    //表格数据
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    //表头配置项
    tableColumn: {
      type: Array,
      default() {
        return []
      }
    },
    //选择项配置
    rowSelection: {
      type: Object,
      default() {
        return null
      }
    },
    //加载状态
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pagination: {
        ...this.pageOption,
        showQuickJumper: true,
        showTotal: total => `共 ${this.pagination.total} 条数据`,
        onChange: this.sizeChanges
      },
      //总页数
      totalPage: 0
    };
  },
  computed: {
    //动态插槽
    actionRender() {
      const acR = []
      this.tableColumn.forEach(el => {
        if (el?.scopedSlots) {
          acR.push(el)
        }
      });
      return acR
    }

  },
  methods: {
    change(pagination) {
      // this.$emit('tableChagne', pagination)
    },
    //获取页码
    sizeChanges(current = 1, pageSize) {
      this.$emit('sizeChange', current, pageSize)
    },
    //计算总页数
    getTotalPage() {
      this.totalPage = Math.ceil(
        this.pageOption.total / this.pageOption.pageSize
      );
      this.$nextTick(() => {
        let jumpText = document.getElementsByClassName("ant-pagination-options-quick-jumper")
        jumpText.length > 0 ? jumpText[0].lastChild.data = `/${this.totalPage}页` : null
      })
    }
  },
  mounted() {
    this.getTotalPage()
  }
};
</script>
<style lang="less" scoped>
#jl-tableCom-table {
  margin: 15px 25px 15px 25px;
  position: relative;
  /deep/.ant-table-pagination .ant-pagination-total-text {
    float: none;
  }
  .jl-tableCom-buttonSolt {
    position: absolute;
    bottom: 32px;
  }
  .ant-btn {
    height: 32px;
  }
  /deep/.ant-table-pagination {
    padding: 16px 0;
  }
}
</style>