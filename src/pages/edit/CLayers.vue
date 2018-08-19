<template>
  <div class="root">
    <p v-for="(el, index) in Layers" :key="index"
       @click="showLayer(el)">
      <input
        type="checkbox"
        :checked="$store.state.editLayers.indexOf(el.name) > -1"
        value="el"> {{el.name}}
    </p>
  </div>
</template>

<script>
  export default {
    name: "CTool",
    data() {
      return {
        Layers: [
          {name: "Районы", polyline: [[55.8, 49.19], [55.82, 49.192]]},
          {name: "Населенные пункты", polyline: [[55.84, 49.19], [55.826, 49.198]]},
          {name: "Дороги (улицы)", polyline: [[55.85, 49.19], [55.827, 49.190]]},
          {name: "Строения"},
          {name: "Водные объекты плош."},
          {name: "Водные объекты лин."},
          {name: "Растительность площ"},
          {name: "Просеки"}
        ]
      }
    },
    methods: {
      showLayer(el) {
        this.$store.dispatch('setEditLayer', el.name)
      }
    }
  }
</script>

<style scoped>
  .root {
    z-index: 10;
    position: absolute;
    top: 150px;
    left: 100px;
    background: white;
    min-height: 30px;
    box-shadow: 2px 2px 5px #999;
    font-size: 14px;
  }

  p:hover {
    background: #f5f5f5;
  }

  p {
    cursor: pointer;
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #f5f5f5;
  }
</style>
