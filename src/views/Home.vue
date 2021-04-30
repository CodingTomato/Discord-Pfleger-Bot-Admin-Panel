<template>
  <v-container style="padding: 0" fluid>
    <v-row no-gutters>
      <v-col :cols="4" >
        <v-card class="pa-2 mr-2" elevation="2">
          <v-card-subtitle>Alle stumme Nutzer</v-card-subtitle>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Username
                    </th>
                    <th class="text-left">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in status.silencedUserIDs" :key="user+user">
                    <td>{{ user }}</td>
                    <td>
                      <v-icon
                        small
                        @click="deleteSilenceUser(user)"
                      >
                        mdi-delete
                      </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="4" >
        <v-card class="pa-2 mr-2" elevation="2">
          <v-card-subtitle>Alle sticky User</v-card-subtitle>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Username
                    </th>
                    <th class="text-left">
                      Channel
                    </th>
                    <th class="text-left">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sticky in stickyUserTranslated" :key="sticky.userid">
                    <td>{{ sticky.userid }}</td>
                    <td>{{ sticky.channelid }}</td>
                    <td>
                      <v-icon
                        small
                        @click="deleteStickyUser(sticky.userid)"
                      >
                        mdi-delete
                </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="!stickyMoverEnabled" @click="startStickyMover" color="success lighten-2" text>
              Start StickyMover
            </v-btn>
            <v-btn v-if="stickyMoverEnabled" @click="stopStickyMover" color="red lighten-2" text>
              Stop StickyMover
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col :cols="4" >
        <v-card class="pa-2 mr-2" elevation="2">
          <v-card-subtitle>Alle BadReactionsUser IDs</v-card-subtitle>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      User ID
                    </th>
                    <!-- <th class="text-left">
                      Aktionen
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="bad in badMsgReactionUserIDs" :key="bad+'badReaction'">
                    <td>{{ bad }}</td>
                    <!-- <td>
                      <v-icon
                        small
                        @click="deleteStickyUser(sticky.userid)"
                      >
                        mdi-delete
                </v-icon>
                    </td> -->
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
      stickyUserTranslated: [],
      stickyMoverEnabled: false,
      badMsgReactionUserIDs: [],
    }
  },
  methods: {
    getStatus: function (){
      this.lastStatus = botApi.getBotStatus().then((res) => {
        this.status = res.data;
        this.stickyMoverEnabled = res.data.stickyMoverEnabled;
        this.badMsgReactionUserIDs = res.data.badMsgReactionUserIDs;
      })
      .catch(() => {
        this.status = {};
        this.stickyMoverEnabled = false;
      });
    },
    getChannelFromID: function (channelid){
      botApi.getChannelFromID(channelid).then((data) => {
        return data.data.name.name;
      });
    },
    startStickyMover: function (){
      botApi.startStickyMover();
    },
    stopStickyMover: function (){
      botApi.stopStickyMover();
    },
    deleteStickyUser: function(userid) {
      botApi.removeStickyUser(userid);
    },
    deleteSilenceUser: function(userid) {
      botApi.exeCommand(`${this.status.prefix} unsilence-user ${userid}`);
    },
  },
  mounted(){
    this.getStatus();
    setInterval(this.getStatus, 2000);

    this.stickyUserTranslated = this.status.stickyUserIDs;

    setInterval(() => {
      this.stickyUserTranslated = [];
      this.status.stickyUserIDs.forEach(element => {
        this.stickyUserTranslated.push({userid: element.userid, channelid: this.status.channels.cache.find(channel => channel.id == element.channelid).name})
      });
    }, 1000);

  }
}
</script>
