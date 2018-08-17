<template>
  <div class="root">
    <img src="../../assets/edit/line.png"/>
    <img src="../../assets/edit/layers.png"/>
    <img src="../../assets/edit/square.png"/>
    <img src="../../assets/edit/car.png"/>
  </div>
</template>

<script>
  export default {
    name: "cPanel"
  }
</script>

<style scoped>
  .root {
    z-index: 10;
    position: absolute;
    top: 100px;
    left: 100px;
    background: white;
    height: 30px;
    box-shadow: 2px 2px 5px #999;
    border-radius: 30px;
    padding: 0 13px;
  }

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  img:hover {
    box-shadow: 0 0 5px #999;
  }
</style>
