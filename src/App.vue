<template>
  <div id="app">
    <router-view/>
    {{data}}
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    this.$store.dispatch('getAlarms');
  },
  data({store}) {
    return {
      data: this.$store.state.alarms
    };
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
