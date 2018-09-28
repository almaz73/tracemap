<template>
  <div class="root">
    <span @click="onSelect('line')">
      <img v-if="!isLine" src="../assets/images/edit/line_gray.png"/>
      <img v-else src="../assets/images/edit/line.png"/>
    </span>

    <span @click="onSelect('layers')" v-if="showLayers">
      <img v-if="!isLayers" src="../assets/images/edit/layers_gray.png"/>
      <img v-else src="../assets/images/edit/layers.png"/>
    </span>

    <span @click="onSelect('square')">
      <img v-if="!isSquare" src="../assets/images/edit/square_gray.png"/>
      <img v-else src="../assets/images/edit/square.png"/>
    </span>

    <span @click="onSelect('car')" v-if="showCars">
      <img v-if="!isCar" src="../assets/images/edit/car_gray.png"/>
      <img v-else src="../assets/images/edit/car.png"/>
    </span>
    <span @click="onSelect('car2')">
      <img v-if="!isCar2" src="../assets/images/edit/car_gray.png"/>
      <img v-else src="../assets/images/edit/car.png"/>
    </span>
  </div>
</template>

<script>
  export default {
    name: "CTool",
    computed: {
      isLayers: function () {
        return this.$store.getters.tools.find(el => el.tool === 'layers' && el.val === true)
      },
      isLine: function () {
        return this.$store.getters.tools.find(el => el.tool === 'line' && el.val === true)
      },
      isSquare: function () {
        return this.$store.getters.tools.find(el => el.tool === 'square' && el.val === true)
      },
      isCar: function () {
        return this.$store.getters.tools.find(el => el.tool === 'car' && el.val === true)
      },
      isCar2: function () {
        return this.$store.getters.tools.find(el => el.tool === 'car2' && el.val === true)
      }
    },
    props: {
      showLayers: {
        type: Boolean,
        default: true
      },
      showCars: {
        type: Boolean
      }
    },
    methods: {
      onSelect(tool) {
        let val = !this["is" + tool[0].toUpperCase() + tool.slice(1)];
        this.$store.dispatch('setTools', {tool, val});
      }
    }
  }
</script>

<style scoped>
  .root {
    z-index: 10;
    position: absolute;
    top: 88px;
    left: 20px;
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

  img:active {
    box-shadow: 0 0 1px red;
  }
</style>
