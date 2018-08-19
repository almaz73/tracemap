<template>
  <div class="root">
    <img @click="onSelect('line')" :class="{'selected': isLine}" src="../../assets/edit/line.png"/>
    <img @click="onSelect('layers')" :class="{'selected': isLayers}" src="../../assets/edit/layers.png"/>
    <img @click="onSelect('square')" :class="{'selected': isSquare}" src="../../assets/edit/square.png"/>
    <img @click="onSelect('car')" :class="{'selected': isCar}" src="../../assets/edit/car.png"/>
  </div>
</template>

<script>
  export default {
    name: "CTool",
    computed: {
      isLayers() {
        return this.$store.state.editTools.indexOf('layers') > -1
      },
      isLine: () => null,
      isSquare: () => null,
      isCar: () => null
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
    height: 30px;
    box-shadow: 2px 2px 5px #999;
    border-radius: 30px;
    padding: 0 13px;
  }

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  img:hover, img.selected {
    box-shadow: 0 0 5px #999;
  }

  img:active {
    box-shadow: 0 0 5px red;
  }
</style>
