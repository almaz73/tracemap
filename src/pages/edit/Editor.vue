<template>
  <div>
    <Frame :without="['Alert']"/>
    <MapComponentEdit :layers="layers"/>

    <CTool/>
    <CLayers v-if="isLayers" :layers="layers"/>
  </div>
</template>

<script>
  import Frame from "../../components/Frame";
  import MapComponentEdit from "../../components/MapComponentEdit";
  import CTool from "./CTool";
  import CLayers from "./CLayers";

  export default {
    name: "Editor",
    components: {MapComponentEdit, Frame, CTool, CLayers},
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
          {name: "Просеки"}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
