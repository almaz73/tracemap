<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import localforage from 'localforage';

  export default {
    name: 'App',
    data({store}) {
      return {
        data: this.$store.state.alarms
      };
    },
    mounted() {
      let me = this;

      // заполняем store через диспатч из локалфораже
      async function initializeApp() {
        await localforage.getItem('state', function (a, storage) {
          storage && Object.keys(storage).map(el => {
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
  @font-face {
    font-family: Roboto Condensed;
    src: url(../src/assets/fonts/Roboto-Regular.ttf);
  }

  body {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Roboto Condensed', 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
  }

  /*стилизация кнопки масшталирования карты*/
  .leaflet-top.leaflet-left {
    right: 10px !important;
    bottom: 40px !important;
    top: inherit;
    left: inherit;
    height: 100px !important;
  }

  .leaflet-top.leaflet-right {
    top: 60px;
  }

  .leaflet-control-zoom-in, .leaflet-control-zoom-out {
    margin-bottom: 10px;
    width: 40px !important;
    height: 40px !important;
    line-height: 40px !important;
    border-radius: 40px !important;
    box-shadow: 0 0 3px #999;
  }

  .leaflet-bar {
    border: none !important;
  }
  /* end стилизация кнопки масшталирования карты*/
</style>
