<template>
  <v-container style="padding: 0" class="mx-auto" max-width="100%">
    <v-row no-gutters>
      <v-col :cols="4">
        <v-row no-gutters>
          <v-col :cols="6">
            <v-card class="pa-2 mr-2" height="78vh" style="overflow-y: scroll" elevation="2">
              <v-list flat dense>
                <v-subheader>Befehle</v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item v-for="command in commandsArray" :key="command.name">
                    <v-list-item-icon>
                      <v-icon v-text="command.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{command.name}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col :cols="6">
            <v-row no-gutters>
              <v-col :cols="12">
                <v-card class="pa-2 mr-2" height="39vh" style="overflow-y: scroll" elevation="2">
                  <v-list flat dense>
                    <v-subheader>Channels</v-subheader>
                    <v-list-item-group color="primary">
                      <span v-for="channel in this.channelsArray" :key="channel.id">
                        <v-list-item v-if="!(channel.type == 'category')" v-on:click="copyToClipboard(channel.id)">
                          <v-list-item-content>
                            <v-list-item-title>{{channel.name}}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </span>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col :cols="12">
                <v-card class="pa-2 mr-2 mt-1" height="39vh" style="overflow-y: scroll" elevation="2">
                  <v-list flat dense>
                    <v-subheader>Online users</v-subheader>
                    <v-list-item-group color="primary">
                      <v-list-item v-for="user in this.usersArray" :key="user.id" v-on:click="copyToClipboard(user.id)">
                        <v-list-item-content>
                          <v-list-item-title>{{user.username}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="8" >
        <v-card class="pa-2" elevation="2">
          <v-card-subtitle>Befehlinfo</v-card-subtitle>
          <v-card-text>
            <p class="text--primary">
              <b>Name:</b> {{ commandsArray[selectedItem].name }}<br>
              <span v-if="commandsArray[selectedItem].aliases.length"><b>Alias:</b> <span v-for="alias in commandsArray[selectedItem].aliases" :key="alias">{{alias}}, </span></span><br>
              <b>Beschreibung:</b> {{ commandsArray[selectedItem].description }}<br>
              <b>Nutzung:</b> <v-chip outlined>#PREFIX</v-chip>  <v-chip color="primary" outlined>{{ commandsArray[selectedItem].name }}</v-chip> <span v-if="commandsArray[selectedItem].usage"><v-chip color="purple" class="mr-1" outlined v-for="pill in commandsArray[selectedItem].usage.split(' ')" :key="pill">{{ pill.substring(1).replace('>','') }}</v-chip> </span> 
            </p>
          </v-card-text>
        </v-card>
        <v-card class="pa-2 mt-2" elevation="2" v-if="commandsArray[selectedItem].webExe">
          <v-card-subtitle>Ausführen</v-card-subtitle>
          <v-card-text>
            <v-row no-gutters>
              <v-col class="mt-5" :cols="2">
                <v-chip outlined class="mr-2">#PREFIX</v-chip><v-chip color="primary" outlined>{{ commandsArray[selectedItem].name }}</v-chip>
              </v-col>
              <v-col class="mr-1" :cols="9">
                <v-row no-gutters v-if="commandsArray[selectedItem].usage">
                  <v-col class="mr-1" v-for="arg in commandsArray[selectedItem].usage.split(' ')" :key="arg">
                    <v-text-field :label="arg.substring(1).replace('>','')" hide-details="auto" :rules="rules" :id="arg.substring(1).replace('>','')"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary lighten-2" text v-on:click="exeCommand">
              Ausführen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :timeout="3000">
        {{ snackbar_text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Schließen
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import BotApi from "@/services/botApiService.js";
const botApi = new BotApi();

export default {
  name: 'Commands',
  components: { },
  data(){
    return {
      prefix: "#Spotify",
      status: {},
      commandsArray: {},
      channelsArray: [],
      usersArray: [],
      selectedItem: 0,
      selectedChannel: 0,
      rules: [
        value => !!value || 'Pflichtfeld.',
      ],
      snackbar: false,
      snackbar_text: 'Befehl erfolgreich versandt!',
    }
  },
  methods:{
    getAllCommands: function(){
      return botApi.getBotCommands();
    },
    getStatus: function(){
      return botApi.getBotStatus();
    },
    exeCommand: function(){
      let msg = this.prefix + " " + this.commandsArray[this.selectedItem].name + " ";
      if(this.commandsArray[this.selectedItem].usage){
        this.commandsArray[this.selectedItem].usage.split(' ').forEach(arg => {
          msg += document.getElementById(arg.substring(1).replace('>','')).value + " ";
        });
      }

      this.snackbar_text = 'Befehl erfolgreich versandt!';
      this.snackbar = true;

      return botApi.exeCommand(msg.toString());
    },
    fallbackCopyTextToClipboard: function(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    },
    copyToClipboard: function(channelid){
      this.snackbar_text = 'ID erfolgreich kopiert!';
      this.snackbar = true;
      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(channelid);
        return;
      }
      navigator.clipboard.writeText(channelid).then(function() {
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    },
  },
  mounted(){
    this.getAllCommands().then((data) => {
      this.commandsArray = data.data;
      this.commandsArray.sort(function(a, b) {
        let categoryA = a.category.toUpperCase();
        let categoryB = b.category.toUpperCase();
        if (categoryA < categoryB) { return -1; }
        if (categoryA > categoryB) { return 1; }
        return 0;
      });
    });
    this.getStatus().then(data => {
      this.channelsArray = data.data.channels.cache;
      this.usersArray = data.data.users.cache;
      this.channelsArray.sort(function(a, b) {
        return a.parentID - b.parentID;
      });
    });
  },
}
</script>
