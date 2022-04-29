<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-01 14:32:01
 * @LastEditors: went
 * @LastEditTime: 2021-12-24 10:18:41
-->
<template>
  <div>
    <a-menu
      mode="inline"
      :theme="theme"
      @click="handleMenuClick"
      :defaultOpenKeys='openKeys'
      :defaultSelectedKeys='selectedKeys'
      :selectedKeys='selectedKeys'
      :openKeys.sync="openKeys"
    >
      <template v-for="item in fullMenus">
        <!-- 一级无子菜单  tip:通过name跳转避免出现路由覆盖问题 -->
        <a-menu-item
          v-if="!item.children||item.children.length===0"
          :key="item.id"
          class="menu-item"
          @click="() => $router.push({ name: item.name })"
        >
          <svg-icon
            :icon-class="item.icon"
            :scale="1"
          ></svg-icon>
          <span>{{ item.title }}</span>
        </a-menu-item>
        <!-- 一级有子菜单 -->
        <sub-menu
          v-else
          :key="item.id"
          :menu-info="item"
        />
      </template>
    </a-menu>
  </div>
</template>
<script>
import SubMenu from "./SubMenu.vue";
import { mapState } from 'vuex'
export default {
  components: {
    SubMenu
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
      openKeysMap: {} //单id跟父级菜单的映射表
    };
  },
  watch: {
    "$route.path": function (val) {
      // this.selectedKeys = this.selectedKeysMap[val];
      // this.openKeys = this.openKeysMap[val];
    }
  },
  computed: {
    ...mapState('addRoutes', ['fullMenus'])
  },
  created() {
    this.mapOpenKeys(this.fullMenus) //生成菜单id跟父级菜单的映射表
    this.selectedKeys = [this.$route.meta.id]//设置初始选中项 拿到菜单的id(同路由id)作为selectedKeys
    this.openKeys = [this.openKeysMap[this.selectedKeys]] //设置初始展开项
  },
  methods: {
    /**
     * @desc: 点击菜单跳转
     * @param {Object} params  菜单click回调事件自带参数
     * @author: went
     */
    handleMenuClick(params) {
      this.selectedKeys = params.keyPath
      this.openKeys = params.keyPath
    },
    /**
     * @desc: 创建菜单id跟父级菜单的映射表
     * @param {String} menus  菜单树
     * @param {Object} parentMenu  父级菜单key
     * @author: went
     */
    mapOpenKeys(menus, parentKey = {}) {
      menus.forEach(item => {
        this.openKeysMap[item.id] = parentKey;
        if (item.children?.length) {
          this.mapOpenKeys(item.children, item.id)
        }
      })
    }
  }
};
</script>
<style lang="less">
/deep/.ant-menu {
  .ant-menu-item,
  .ant-menu-submenu-title {
    font-size: 14px;
    color: #494b4d;
    margin: 0 12px;
    width: 220px;
    height: 48px;
    line-height: 48px;
    list-style-position: inside;
    list-style-type: disc;
  }
  .svg-icon {
    margin-right: 16px;
    color: #a5aeb8;
  }
  .ant-menu-item-selected {
    color: #3399ff;
    background: rgba(235, 245, 255, 1);
    border-radius: 8px;
    .svg-icon {
      color: #3399ff;
    }
  }
}
/deep/.ant-menu-sub.ant-menu-inline > .ant-menu-item,
.ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
  height: 48px;
  line-height: 48px;
  list-style-position: inside;
  list-style-type: disc;
}
/deep/.ant-menu-inline .ant-menu-selected::after,
.ant-menu-inline .ant-menu-item-selected::after {
  transform: scaleY(1);
  opacity: 0;
  transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/deep/ .ant-menu-submenu-arrow {
}
</style>
