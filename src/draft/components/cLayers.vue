<template>
  <div class="root">
    <p v-for="(el, index) in layers" :key="index"
       @click="showLayer(el)">
      <input
        type="checkbox"
        :checked="$store.state.editLayers.indexOf(el.id) > -1"/>
      {{el.name}}
    </p>
  </div>
</template>

<script>
  export default {
    name: "cLayers",
    props: {
      layers: {
        type: Array,
        default() {
          return [
            {name: "Районы", polyline: [[55.8, 49.19], [55.82, 49.192]]},
            {name: "Населенные пункты", polyline: [[55.84, 49.19], [55.826, 49.198]]},
            {name: "Дороги (улицы)", polyline: [[55.85, 49.19], [55.827, 49.190]]},
            {name: "Строения"},
            {name: "Водные объекты плош."},
            {name: "Водные объекты лин."},
            {name: "Растительность площ"},
            {name: "Просеки"},
            {
              name: "Цветная линия",
              polyline: [
                [55.787273, 49.198124],
                [55.782772, 49.198516],
                [55.785767, 49.187106],
                [55.776569, 49.192082],
                [55.771863, 49.197120],
                [55.768354, 49.195178]
              ],
              color: ['#bd0026', '#f03b20', '#fd8d3c', '#fecc5c', '#ffffb2', '#bd0026']
            }
          ]
        }
      }
    },
    methods: {
      showLayer(el) {
        this.$store.dispatch('setEditLayer', el.id);
        this.$root.$emit('SELECTED_LAYER', el.id, this.$store.state.editLayers.indexOf(el.id) > -1);
      }
    }
  }
</script>

<style scoped>
  .root {
    z-index: 10;
    position: absolute;
    top: 156px;
    left: 20px;
    background: white;
    min-height: 30px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    font-size: 14px;
    min-width: 358px;
    border-radius: 3px;
  }

  p:hover {
    background: #f5f5f5;
  }

  p {
    cursor: pointer;
    margin: 0;
    border-bottom: 1px solid #f5f5f5;
    border-radius: 3px;
    line-height: 38px;
  }
</style>
