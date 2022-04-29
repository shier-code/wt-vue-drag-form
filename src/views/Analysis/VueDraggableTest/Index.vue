<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-04-25 09:39:45
 * @LastEditors: went
 * @LastEditTime: 2022-04-29 15:42:07
-->
<template>
  <div class="">
    <h2>两列拖动</h2>
    <!--使用draggable组件-->
    <div class="itxst">
      <div class="col-left">
        <div class="title">国内网站</div>
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
        <div class="title">你可以把左边的元素拖到右边</div>
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
            <div
              class="item"
              v-for="(item,index) in formList"
              :key="index"
              @click.capture="selectCpn(item)"
            >
              <form-cpn :formItem="item"></form-cpn>
            </div>
          </transition-group>
        </draggable>
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
  </div>
</template>
 
<script>
import draggable from 'vuedraggable'
import FormCpn from './cpns/FormCpn'
import InputCpn from './cpns/Input'
import SelectCpn from './cpns/Select'
import optionWidget from './config/optionWidget'
import defaultForm from './config/defaultForm'
import { mapState, mapActions } from 'vuex'
import common from '@/utils/common'
export default {
  name: '',
  components: {
    draggable,
    FormCpn,
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
      tenpList: null
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
  background-color: blue !important;
}

.chosenClass {
  background-color: red !important;
  opacity: 1 !important;
}

.dragClass {
  background-color: blueviolet !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}

.itxst {
  margin: 10px;
  display: flex;
}

.title {
  padding: 6px 12px;
}
.col-left {
  width: 20%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}
.col-center {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}
.col-right {
  width: 30%;
  flex: 1;
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