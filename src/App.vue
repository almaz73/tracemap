<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import localforage from 'localforage';

  export default {
    name: 'App',
    beforeCreate() {
      this.$store.dispatch('getAlarms');
    },
    data({store}) {
      return {
        data: this.$store.state.alarms
      };
    },
    mounted() {
      let me = this;

      // заполняем store через диспатч из локалфораже
      async function initializeApp() {
        await localforage.getItem('state', function(a, storage) {
          Object.keys(storage).map(el => {
            if (el === "editTools") {
              storage[el].map(item => me.$store.dispatch('setEditTool', item));
            }
            if (el === "editLayers") {
              storage[el].map(item => me.$store.dispatch('setEditLayer', item));
            }
          });
        });
      }

      initializeApp();
    }
  };
</script>

<style>
  @import "leaflet/dist/leaflet.css";

  body {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
  }
</style>
