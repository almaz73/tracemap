<template>
  <div class="root">
    <span @click="onSelect('line')" title="Линейка">
      <img v-if="!isLine" src="../../assets/images/edit/line_gray.png"/>
      <img v-else src="../../assets/images/edit/line.png"/>
    </span>

    <span @click="onSelect('objectLayers')" v-if="showObjectLayers && readyForProduct" title="Слои">
      <img v-if="!isObjectLayers" src="../../assets/images/edit/layers_gray.png"/>
      <img v-else src="../../assets/images/edit/layers.png"/>
    </span>

    <span @click="onSelect('square')" v-if="readyForProduct && false" title="Добавление новых слоев">
      <img v-if="!isSquare" src="../../assets/images/edit/square_gray.png"/>
      <img v-else src="../../assets/images/edit/square.png"/>
    </span>

    <span @click="onSelect('section')" title="Путь между двумя точками">
      <img v-if="!isSection" src="../../assets/images/edit/path_gray.png"/>
      <img v-else src="../../assets/images/edit/path.png"/>
    </span>

    <span @click="onSelect('car')" v-if="showCars" title="Бригады">
      <img v-if="!isCar" src="../../assets/images/edit/car_gray.png"/>
      <img v-else src="../../assets/images/edit/car.png"/>
    </span>

  </div>
</template>

<script>
  export default {
    name: "Tools",
    data() {
      return {
        // если режим разработки - показываем все кнопки, а для продуктовой только готовые без этого условия
        readyForProduct: document.location.href.includes('localhost:8080') || false
      }
    },
    computed: {
      isObjectLayers: function () {
        return this.$store.getters.tools.find(el => el.tool === 'objectLayers' && el.val === true)
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
      isSection: function () {
        return this.$store.getters.tools.find(el => el.tool === 'section' && el.val === true)
      }
    },
    props: {
      showLayers: {
        type: Boolean,
        default: true
      },
      showObjectLayers: {
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
        this.$root.$emit('UN_SELECTED_CALL', 'forse');
        this.$root.$emit('UN_SELECTED_BRIGADE', 'forse');
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
