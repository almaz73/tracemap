<template>
  <div>
    <Frame/>
    <MapComponentEdit/>

    <cTool />
    <cLayers v-if="selected == 'layers'"/>
  </div>
</template>

<script>
  import Frame from "../../components/Frame";
  import MapComponentEdit from "../../components/MapComponentEdit";
  import cTool from "../edit/cTool";
  import cLayers from "../edit/cLayers";

  export default {
    name: "Editor",
    components: {MapComponentEdit, Frame, cTool, cLayers},
    computed: {
      selected: function () {
        return this.$store.state.showLayer
      }
    }
  }
</script>

<style scoped>

</style>
