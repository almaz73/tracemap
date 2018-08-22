<template>
  <div>
    <Frame :without="['Alert']"/>
    <CMapDraw/>
  </div>
</template>

<script>
  import Frame from "../components/Frame";
  import CMapDraw from "../components/CMapDraw";

  export default {
    name: "Map4",
    components: {CMapDraw, Frame}
  }
</script>

<style scoped>

</style>
