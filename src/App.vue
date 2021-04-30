<template>
  <v-app>
    <nav-bar v-if="loggedin"></nav-bar>
    <app-bar v-if="loggedin"></app-bar>

    <v-main v-if="loggedin">
      <v-container fluid>
        <basic-template>
          <router-view></router-view>
        </basic-template>
      </v-container>
    </v-main>
    <div v-if="!loggedin" class="mt-7">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              Weißt du das Passwort?
            </div>
            <v-list-item-title class="headline mb-1">
              Einloggen
            </v-list-item-title>
            <form>
              <v-text-field label="Passwort" v-model="passwordfield" type="password"></v-text-field>
              <v-btn depressed color="primary" @click="checkPW">Einloggen</v-btn>
            </form>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
            color="grey"
          ><v-img src="../src/assets/logo.png"></v-img></v-list-item-avatar>
        </v-list-item>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import NavBar from './components/NavBar.vue';
import BasicTemplate from '@/components/BasicTemplate.vue';
import config from '../config.js';

export default {

  name: 'App',

  components: {
    AppBar,
    NavBar,
    BasicTemplate,
  },

  data () {
      return {
        loggedin: false,
        passwordfield: "",
      }
  },
  mounted(){
    if(this.getCookie('voisdfbiogslhifokls8458ru34ßgt8z') === "true"){
      this.loggedin = true;
    }
  },
  methods:{
    setCookie(cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    checkPW() {
      if(this.passwordfield === config.admin) {
        this.setCookie("voisdfbiogslhifokls8458ru34ßgt8z", "true", 1);
        this.loggedin = true;
      } else {
        alert("Falsches Passwort");
      }
    },
  },
};
</script>
