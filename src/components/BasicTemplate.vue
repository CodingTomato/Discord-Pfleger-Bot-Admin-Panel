<template>
  <div style="margin: 0; padding: 0;">
    <status-bar :is-connected="this.isBotConnected"></status-bar>
    <slot></slot>
  </div>
</template>

<script>
import StatusBar from "@/components/StatusBar";
import BotApi from "@/services/botApiService.js";
const botApi = new BotApi();

export default {
  name: "BasicTemplate",
  components: {
    StatusBar,
  },
  data() {
    return {
      lastStatus: {},
      isBotConnected: false,
    };
  },
  methods: {
    getBotStatus() {
      this.lastStatus = botApi.getBotStatus().then((res) => {
        if (res.data.botstatus === "online") {
          this.isBotConnected = true;
        } else {
          this.isBotConnected = false;
        }
      })
      .catch(() => {
        this.isBotConnected = false;
      });
    },
  },
  mounted(){
    setInterval(this.getBotStatus, 1000);
  },
};
</script>
