<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="1" class="pa-2 d-flex justify-center">
          <v-btn color="success" elevation="2" fab>
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <h5 class="mt-5 ml-2">VERBUNDEN</h5>
      </v-col>
      <v-col cols="12" md="8" class="pa-2 d-flex justify-center align-center">
          <h3>------------------------------------------------Statistik------------------------------------------------</h3>
      </v-col>
      <v-col cols="12" md="1" class="pa-2 d-flex justify-center align-center">
        <v-btn
          block
          color="success"
          elevation="2"
          large
        >Start</v-btn>
      </v-col>
      <v-col cols="12" md="1" class="pa-2 d-flex justify-center align-center">
        <v-btn
          block
          color="warning"
          elevation="2"
          large
        >Restart</v-btn>
      </v-col>
      <v-col cols="12" md="1" class="pa-2 d-flex justify-center align-center">
        <v-btn
          block
          color="red"
          elevation="2"
          large
        >Stop</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: { }
}
</script>
