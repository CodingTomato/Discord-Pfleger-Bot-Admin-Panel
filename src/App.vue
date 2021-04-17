<template>
  <v-app>
    <nav-bar></nav-bar>
    <app-bar></app-bar>

    <v-main>
      <v-container fluid>
        <basic-template>
          <router-view></router-view>
        </basic-template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import NavBar from './components/NavBar.vue';
import BasicTemplate from '@/components/BasicTemplate.vue';

export default {

  name: 'App',

  components: {
    AppBar,
    NavBar,
    BasicTemplate,
  },

  data () {
      return { }
  },
};
</script>
