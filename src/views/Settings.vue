<template>
  <v-container style="padding: 0" fluid>
    <v-card>
        <v-card-subtitle>API Einstellungen</v-card-subtitle>
        <v-card-text>
            <v-text-field label="API Base URL" hide-details="auto"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                text
            >
                Speichern
            </v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Settings',
  components: {
      
  },
  methods: {

  },
  data() {
    return{
        
    }
  },
  mounted(){
    
  }
}
</script>
