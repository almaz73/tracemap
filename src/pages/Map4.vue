<template>
  <div>
    <Frame :without="['Alert']"/>
    <CMap :layers="layers"/>
  </div>
</template>

<script>
  import Frame from "../components/Frame";
  import CMap from "../components/CMap";

  export default {
    name: "Map4",
    components: {CMap, Frame},
    computed: {
      isLayers() {
        return this.$store.state.editTools.indexOf('layers') > -1
      }
    },
    data() {
      return {
        layers: [
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
            polyline: [[55.787273, 49.198124], [55.782772, 49.198516], [55.785767, 49.187106], [55.776569, 49.192082], [55.771863, 49.197120], [55.768354, 49.195178]],
            color: ['#bd0026', '#f03b20', '#fd8d3c', '#fecc5c', '#ffffb2', '#bd0026']
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
