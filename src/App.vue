<template>
  <v-app>
    <nav-bar></nav-bar>
    <app-bar></app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import NavBar from './components/NavBar.vue';

export default {

  name: 'App',

  components: {
    AppBar,
    NavBar,
  },

  data () {
      return { }
  },
};
</script>
