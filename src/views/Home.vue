<template>
  <v-container style="padding: 0" fluid>
    <v-row no-gutters>
      <v-col :cols="4" >
        <v-card class="pa-2 mr-2" elevation="2" v-if="this.status.silencedUserIDs">
          <v-card-subtitle>Silenced User IDs</v-card-subtitle>
          <v-card-text>
            <p>{{ this.status.silencedUserIDs }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BotApi from "@/services/botApiService.js";
const botApi = new BotApi();


export default {
  name: 'Home',
  components: {
    
  },
  data(){
    return {
      status: {},
    }
  },
  methods: {
    getStatus: function (){
      this.lastStatus = botApi.getBotStatus().then((res) => {
        this.status = res.data;
      })
      .catch(() => {
        this.status = {};
      });
    },
  },
  mounted(){
    this.getStatus();
    setInterval(this.getStatus, 2000);
  }
}
</script>
