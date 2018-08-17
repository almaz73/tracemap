<template>
  <div>
    <Frame/>
    <MapComponentEdit />

    <cPanel />
  </div>
</template>

<script>
  import Frame from "../../components/Frame";
  import MapComponentEdit from "../../components/MapComponentEdit";
  import cPanel from "../edit/cPanel";
  export default {
    name: "Editor",
    components: {MapComponentEdit, Frame, cPanel}
  }
</script>

<style scoped>

</style>
