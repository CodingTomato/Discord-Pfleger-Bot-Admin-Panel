<template>
<div>
    <v-card>
      <v-navigation-drawer
        permanent
        expand-on-hover
        app
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="../assets/logo.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item v-on:click="redirectToHome">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="redirectToCommands">
            <v-list-item-icon>
              <v-icon>mdi-message-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Befehle</v-list-item-title>
          </v-list-item>
          <v-list-item v-on:click="redirectToLogs">
            <v-list-item-icon>
              <v-icon>mdi-math-log</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logs</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',

    data () {
      return { }
    },
    methods:{
      redirectToHome(){
        this.$router.push('/');
      },
      redirectToCommands(){
        this.$router.push('/commands');
      },
      redirectToLogs(){
        this.$router.push('/logs');
      }
    }
  }
</script>
