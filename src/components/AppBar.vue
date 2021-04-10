<template>
    <v-app-bar color="teal" app dark class="m-0">
        <v-toolbar-title>Pfleger Bot - Admin</v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
        </v-btn> -->

        <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item v-for="n in 5" :key="n"  @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
  export default {
    name: 'AppBar',

    data () {
      return { }
    },
  }
</script>
