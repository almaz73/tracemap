<template>
  <div>
    <Frame/>
    <MapComponentEdit/>

    <CTool/>
    <CLayers v-if="layers"/>
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
      layers() {
        return this.$store.state.editTools.indexOf('layers') > -1
      }
    }
  }
</script>

<style scoped>

</style>
