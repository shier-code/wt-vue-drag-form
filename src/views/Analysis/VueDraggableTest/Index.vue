<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-04-25 09:39:45
 * @LastEditors: went
 * @LastEditTime: 2022-05-10 16:33:33
-->
<template>

  <!--使用draggable组件-->
  <div class="wt-drag-form">
    <div class="col-left">
      <div class="title">控件</div>
      <draggable
        v-model="optionWidget"
        group="site"
        animation="300"
        dragClass="dragClass"
        ghostClass="ghostClass"
        chosenClass="chosenClass"
        :allbackOnBody='true'
        @start="onStart"
        @end="onEnd"
      >
        <transition-group>
          <div
            class="item"
            v-for="(item) in optionWidget"
            :data-uid="item.id"
            :key="item.id"
          >{{item.title}}</div>
        </transition-group>
      </draggable>
    </div>
    <div class="col-center">
      <div class="wt-radio-btn">
        <a-radio-group
          v-model="showType"
          style="margin-bottom: 16px"
        >
          <a-radio-button value="app">
            手机
          </a-radio-button>
          <a-radio-button value="web">
            电脑
          </a-radio-button>
        </a-radio-group>
      </div>
      <div class="wt-center-area">
        <draggable
          v-model="defaultForm"
          group="site"
          animation="100"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd"
          @change="onChange"
        >

          <transition-group>
            <template v-if="showType==='app'">
              <div
                class="item"
                v-for="(item,index) in formList"
                :key="index"
                @click.capture="selectCpn(item)"
              >
                <form-app :formItem="item">
                </form-app>
              </div>
            </template>
            <template v-else>
              <div
                class="wt-center-web-item"
                v-for="(item,index) in formList"
                :key="index"
                @click.capture="selectCpn(item)"
              >
                <form-web :formItem="item">
                </form-web>
              </div>
            </template>

          </transition-group>
        </draggable>
      </div>

    </div>
    <div class="col-right">
      <template v-if="formList.length">
        <div
          v-for="item in formList"
          :key="item.id"
        >
          <component
            v-if="item.type===curCpnType&&item.id===curCpnId"
            :is="item.type"
            :propsData="curCpn"
          ></component>
        </div>
      </template>
    </div>
  </div>
</template>
 
<script>
import draggable from 'vuedraggable'

import FormWeb from './cpns/FormWeb'
import FormApp from './cpns/FormApp'
import InputCpn from './cpns/FormConfig/Input'
import SelectCpn from './cpns/FormConfig/Select'
import optionWidget from './config/optionWidget'
import defaultForm from './config/defaultForm'

import { mapState, mapActions } from 'vuex'
import common from '@/utils/common'
export default {
  name: '',
  components: {
    draggable,

    FormWeb,
    FormApp,

    InputCpn,
    SelectCpn
  },
  data() {
    return {
      optionWidget,
      defaultForm,
      drag: false,
      temparr1: [],
      inputAttr: {
        type: 'text',
        placeholder: '请输入'
      },
      curCpn: null,
      curCpnType: "",
      curCpnId: "",
      tenpList: null,
      showType: 'app'
    }
  },
  computed: {
    ...mapState('dragForm', ['formList'])
  },
  created() {
    this.setFormList(JSON.parse(JSON.stringify(this.defaultForm)))
  },
  methods: {
    ...mapActions('dragForm', ['setFormList']),
    onChange(evt) {
      console.log('---------', evt.added.newIndex);

      let newFormList = JSON.parse(JSON.stringify(this.formList))
      let formItem = evt.added.elememt
      if (evt.added) {
        formItem = evt.added.element
        let newIndex = evt.added.newIndex
        formItem.id = common.getGuid()
        newFormList.splice(newIndex, 0, formItem)
        this.setFormList(newFormList)
      }
    },
    onStart(e) {
      this.drag = true;
      this.temparr1 = JSON.parse(JSON.stringify(this.optionWidget))
    },
    onEnd(e) {
      //暂存左侧控件列表
      this.optionWidget = this.temparr1
      this.drag = false;
    },
    selectCpn(curCpn) {
      this.curCpn = curCpn
      const { type, id } = curCpn
      this.curCpnType = type
      this.curCpnId = id
    }
  },
  beforeDestroy() {
    this.setFormList([])
  }
}
</script>
 
<style scoped lang = "less">
/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: #8e8e8e !important;
}

.chosenClass {
  /* background-color: red !important; */
  opacity: 1 !important;
}

.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}

.wt-drag-form {
  display: flex;
  height: 100%;
}

.col-left {
  height: 100%;
  width: 304px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  .title {
    height: 48px;
    line-height: 48px;
    padding-left: 24px;
    font-size: 16px;
    color: #303233;
    border-bottom: 1px solid #e1e3e5;
  }
}
.col-center {
  flex: 1;
  height: 100%;
  background: #f2f5f7;

  .wt-radio-btn {
    height: 72px;
    line-height: 72px;
    text-align: center;
  }
  .wt-center-area {
    background: #ffffff;
    height: calc(100% - 72px);
    margin: 0 24px 24px;
    padding: 0 24px;
    .wt-center-web-item {
    }
  }
}
.col-right {
  width: 360px;
}
.col + .col {
  margin-left: 10px;
}
.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}

.item + .item {
  border-top: none;
  margin-top: 6px;
}
</style>