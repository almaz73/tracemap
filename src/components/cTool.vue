<template>
  <div class="root">
    <img @click="onSelect('line')" v-if="!isLine" src="../assets/images/edit/line_gray.png"/>
    <img @click="onSelect('line')" v-else src="../assets/images/edit/line.png"/>

    <img @click="onSelect('layers')" v-if="!isLayers" src="../assets/images/edit/layers_gray.png"/>
    <img @click="onSelect('layers')" v-else src="../assets/images/edit/layers.png"/>

    <img @click="onSelect('square')" v-if="!isSquare" src="../assets/images/edit/square_gray.png"/>
    <img @click="onSelect('square')" v-else src="../assets/images/edit/square.png"/>

    <img @click="onSelect('car')" v-if="!isCar" src="../assets/images/edit/car_gray.png"/>
    <img @click="onSelect('car')" v-else src="../assets/images/edit/car.png"/>
  </div>
</template>

<script>
  export default {
    name: "CTool",
    computed: {
      isLayers: function () {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'layers' && el.val === true
        })
      },
      isLine: function () {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'line' && el.val === true
        })
      },
      isSquare: function () {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'square' && el.val === true
        })
      },
      isCar: function () {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'car' && el.val === true
        })
      }
    },
    methods: {
      onSelect(tool) {
        let val = false;
        switch (tool) {
          case 'layers':
            val = !this.isLayers;
            break;
          case 'line':
            val = !this.isLine;
            break;
          case 'square':
            val = !this.isSquare;
            break;
          case 'car':
            val = !this.isCar;
            break;
        }

        if (tool === 'layers') this.$store.dispatch('setTools', {tool: 'car', val: false});
        if (tool === 'car') this.$store.dispatch('setTools', {tool: 'layers', val: false});

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

  /*img:hover, img.selected {*/
  /*box-shadow: 0 0 5px #999;*/
  /*}*/

  img:active {
    box-shadow: 0 0 1px red;
  }
</style>
