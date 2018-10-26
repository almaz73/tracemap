<template>
  <div class="root">
    <img @click="onSelect('line')" v-if="!isLine" src="../../../assets/images/edit/line_gray.png"/>
    <img @click="onSelect('line')" v-else src="../../../assets/images/edit/line.png"/>

    <img @click="onSelect('layers')" v-if="!isLayers" src="../../../assets/images/edit/layers_gray.png"/>
    <img @click="onSelect('layers')" v-else src="../../../assets/images/edit/layers.png"/>

    <img @click="onSelect('square')" v-if="!isSquare" src="../../../assets/images/edit/square_gray.png"/>
    <img @click="onSelect('square')" v-else src="../../../assets/images/edit/square.png"/>

    <img @click="onSelect('car')" v-if="!isCar" src="../../../assets/images/edit/car_gray.png"/>
    <img @click="onSelect('car')" v-else src="../../../assets/images/edit/car.png"/>
  </div>
</template>

<script>
  export default {
    name: "CTool",
    computed: {
      isLayers() {
        return this.$store.state.editTools.indexOf('layers') > -1
      },
      isLine() {
        return this.$store.state.editTools.indexOf('line') > -1
      },
      isSquare() {
        return this.$store.state.editTools.indexOf('square') > -1
      },
      isCar() {
        return this.$store.state.editTools.indexOf('car') > -1
      }
    },
    methods: {
      onSelect(tool) {
        this.$store.dispatch('setEditTool', tool);
      }
    }
  }
</script>

<style scoped>
  .root {
    z-index: 10;
    position: absolute;
    top: 100px;
    left: 100px;
    background: white;
    height: 40px;
    box-shadow: 2px 2px 5px #999;
    border-radius: 90px;
    padding: 0 13px;
  }

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin: 5px 8px;
  }

  /*img:hover, img.selected {*/
    /*box-shadow: 0 0 5px #999;*/
  /*}*/

  img:active {
    box-shadow: 0 0 1px red;
  }
</style>
