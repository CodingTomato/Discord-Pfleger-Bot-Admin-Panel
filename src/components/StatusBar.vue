<template>
    <v-container class="grey darken-4" style="margin-bottom: 0.5em; border-radius: 2px" fluid>
        <v-row no-gutters>
            <v-col cols="12" sm="11" md="1" class="pa-2 d-flex justify-center align-center">
                
                <v-btn v-if="isConnected" color="success" class="ml-5" elevation="2" fab>
                <v-icon>mdi-check</v-icon>
                </v-btn>

                <v-btn v-if="!isConnected" color="red" class="ml-5" elevation="2" fab>
                <v-icon>mdi-close</v-icon>
                </v-btn>

                <h4 v-if="isConnected" class="ml-3">BOT VERBUNDEN</h4>

                <h4 v-if="!isConnected" class="ml-3">BOT NICHT VERBUNDEN</h4>
            </v-col>
            <v-col cols="12" md="8" class="pa-2 d-flex justify-center align-center">
                <h3>--------------------Statistik----------------------</h3>
            </v-col>
            <v-col cols="12" md="3" class="pa-2 d-flex justify-center align-center">
                <v-btn
                color="success"
                elevation="2"
                x-large
                class="mr-3"
                v-if="!isConnected"
                v-on:click="startBot"
                >Start
                <v-icon right dark>
                    mdi-power
                </v-icon>
                </v-btn>
                <v-btn
                color="warning"
                elevation="2"
                x-large
                class="mr-3"
                v-if="isConnected"
                v-on:click="restartBot"
                >Restart
                <v-icon right dark>
                    mdi-restart
                </v-icon>
                </v-btn>
                <v-btn
                color="red"
                elevation="2"
                x-large
                class="mr-3"
                v-if="isConnected"
                v-on:click="stopBot"
                >Stop
                <v-icon right dark>
                    mdi-stop-circle
                </v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BotApi from '@/services/botApiService.js';
const botApi = new BotApi();

export default {
name: 'StatusBar',

data () {
    return { }
},
methods:{
    startBot: function(){
        botApi.startBot();
    },
    stopBot: function(){
        botApi.stopBot();
    },
    restartBot: function(){
        botApi.stopBot().then(() => {
            setTimeout(this.startBot, 2000);
        });
    }
},
props: {
    isConnected: {
        type: Boolean,
        default: false,
    }
}
}
</script>
