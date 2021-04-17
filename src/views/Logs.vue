<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tab key="bot">Bot</v-tab>
      <v-tab key="web">Webinterface</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="bot">
        <v-card class="mx-auto" max-width="100%">
          <v-skeleton-loader
          v-if="loading"
          type="list-item-two-line, list-item-two-line, list-item-two-line"
        ></v-skeleton-loader>
          <v-list dense max-height="73vh" style="overflow-y: scroll">
            <v-list-item-group color="primary">
              <v-list-item v-for="log in botLogs" :key="log.logID">
                <v-list-item-content>
                  <v-list-item-title>{{ log.logMessage }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab-item key="web">
        <v-card class="mx-auto" max-width="100%">
          <v-card-text>
            No logs available
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import BotApi from '@/services/botApiService.js';
const botApi = new BotApi();

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return{
      tab: null,
      botLogs: {},
      loading: false,
    }
  },
  methods: {
    getBotLogs: function(){
      return botApi.getBotLogs();
    }
  },
  mounted(){
    this.loading = true;

    setTimeout(() => {
      this.getBotLogs().then((data) => {
      this.loading = false;
      this.botLogs = data.data.reverse();

      setInterval(() => {
        this.getBotLogs().then((data) => {
          this.botLogs = data.data.reverse();
        });
        }, 1000);
    });
    }, 500);
  }
}
</script>
