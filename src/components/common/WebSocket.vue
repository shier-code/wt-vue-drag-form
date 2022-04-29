<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-06-08 16:04:17
 * @LastEditors: went
 * @LastEditTime: 2021-09-14 19:07:19
-->
<template>
  <div class></div>
</template>
 
<script>
import { socketUrl } from "@/utils/global";
export default {
  name: "",
  components: {},
  data() {
    return {
      msg: "",
      resData: "",
      ws: null,
      timer: null,
      lockReconnect: false,
      baseToken: "",
      baseOrgCode: "",
      reconCounter: 0
    };
  },
  watch: {
    resData: function (val) {
      if (val.type === "task" && val.hasNewTips === "1") {
        this.$store.commit("getHasNewTips", true);
      } else {
        if (
          val.type === "login" &&
          (val.isAllowMutiPcOnline === "0" || val.isTokenEnable === "0")
        ) {
          this.ws.close();
          this.$warning({
            title: "当前登录用户已失效，请重新登录",
            okText: "知道了",
            okType: "danger",
            onOk() {
              if (
                navigator.userAgent.indexOf("Firefox") !== -1 ||
                navigator.userAgent.indexOf("Chrome") !== -1
              ) {
                window.location.href = "about:blank";
                window.close();
              } else {
                window.opener = null;
                window.open("", "_self");
                window.close();
              }
            },
            onCancel() {
              console.log("Cancel");
            }
          });
          return false;
        }
      }
    }
  },
  computed: {},
  created() {
    this.baseToken = sessionStorage.getItem("base_token");
    this.baseOrgCode = sessionStorage.getItem("base_orgcode");
    this.createWebSocket();
  },
  mounted() { },
  methods: {
    createWebSocket() {
      if ("WebSocket" in window) {
        try {
          this.ws = new WebSocket(
            `${socketUrl}?orgCode=${this.baseOrgCode}&token=${this.baseToken}`
          );
          this.initSocket(); //对websocket对象进行初始化
        } catch (e) {
          console.log("创建异常 执行重连...");
          this.websocketReconnect(); //调用重连方法
        }
      } else {
        alert("您的浏览器不支持websocket 请更换浏览器后重试！");
      }
    },

    initSocket() {
      clearInterval(this.timer);
      this.ws = new WebSocket(
        `${socketUrl}?orgCode=${this.baseOrgCode}&token=${this.baseToken}`
      );
      this.ws.addEventListener("open", this.handleWsOpen.bind(this), false);
      this.ws.addEventListener("close", this.handleWsClose.bind(this), false);
      this.ws.addEventListener("error", this.handleWsError.bind(this), false);
      this.ws.addEventListener(
        "message",
        this.handleWsMessage.bind(this),
        false
      );
    },
    handleWsOpen(e) {
      console.log("FE:ws open", e);
      this.handleSendClick();
    },
    handleWsClose(e) {
      console.log("FE:ws close", e);
    },
    handleWsError(e) {
      console.log("FE:ws error", e);
      this.websocketReconnect();
    },
    handleWsMessage(e) {
      this.resData = JSON.parse(e.data);
    },
    handleSendClick() {
      const msg = this.msg;
      this.ws.send(
        JSON.stringify({
          id: new Date(),
          msg: msg
        })
      );
    },
    websocketReconnect() {
      if (this.lockReconnect) {
        // 是否已经执行重连
        return;
      }
      this.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.createWebSocket();
        this.lockReconnect = false;
        this.reconCounter += 1
      }, 5000);
      if (this.reconCounter === 10) {
        clearInterval(this.timer)
        console.log('超过最大重连次数，请重新登录系统...');
      }
    }
  },
  beforeDestroy() { }
};
</script>
 
<style scoped lang = "less">
</style>