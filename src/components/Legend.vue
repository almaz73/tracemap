<template>
  <div class="legend" :class="{closed : !isOpened}" @click="isOpened=!isOpened">
    <div class="head">
      <img src="../assets/images/star.png"/>
      Легенда
    </div>
    <br v-if="isOpened"/>
    <div v-if="isOpened" v-for="(el, ind) in labels" :key="ind">
      <img :src="require('../assets/images/ambulance/brigadeStatus/'+el.img+'.png')"/>
      {{el.text}}
    </div>

  </div>
</template>

<script>
  export default {
    name: "Legend",
    data() {
      return {
        isOpened: closed,
        png: '../assets/images/ambulance/brigadeStatus/atStation.png'
      }
    },
    props: {
      labels: {
        type: Array
      }
    }
  }
</script>

<style scoped>
  .legend {
    z-index: 2;
    position: absolute;
    bottom: 60px;
    left: 20px;
    background: white;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    font-size: 14px;
    min-width: 258px;
    border-radius: 3px;
    padding: 7px 16px 5px 10px;
    cursor: pointer;
  }

  .legend.closed {
    border-radius: 40px !important;
    min-width: inherit !important;
  }

  .head img {
    vertical-align: middle;
    margin-right: 3px;
  }
</style>
