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

      // заполняем store через диспатч из локалфораже (можем восстанавливать вид с предыдущего просмотра)
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

  .leaflet-popup-content-wrapper {
    background-color: cornsilk !important;
  }

  .leaflet-popup-tip {
    background: cornsilk;
  }

  /* end стилизация кнопки масшталирования карты*/

  /************************  Material Icons **********************/
  /* fallback */
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(../src/assets/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  /************************ end Material Icons **********************/

  .datepicker {
    box-shadow: 0 0 12px !important;
  }
</style>
