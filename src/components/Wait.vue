<template>
  <div class="root">
    <img src="../assets/images/wait.gif" height="158" width="158"/>
  </div>
</template>

<script>
  export default {
    name: "Wait"
  }
</script>

<style scoped>
  .root {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    background: black;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    position: absolute
  }
</style>
