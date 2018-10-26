<template>
  <div>
    <Frame :without="['Alert']"/>
    <CMapDraw/>
  </div>
</template>

<script>
  import Frame from "../../draft/components/Frame";
  import CMapDraw from "./CMapDraw";

  export default {
    name: "Map4",
    components: {CMapDraw, Frame}
  }
</script>

<style scoped>

</style>
