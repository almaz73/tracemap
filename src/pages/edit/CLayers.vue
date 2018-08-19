<template>
  <div class="root">
    <p v-for="(el, index) in layers" :key="index"
       @click="showLayer(el)">
      <input
        type="checkbox"
        :checked="$store.state.editLayers.indexOf(el.name) > -1"
        value="el"> {{el.name}}
    </p>
  </div>
</template>

<script>
  export default {
    name: "CTool",
    props: {
      layers: {
        type: Array
      }
    },
    methods: {
      showLayer(el) {
        this.$store.dispatch('setEditLayer', el.name)
      }
    }
  }
</script>

<style scoped>
  .root {
    z-index: 10;
    position: absolute;
    top: 150px;
    left: 100px;
    background: white;
    min-height: 30px;
    box-shadow: 2px 2px 5px #999;
    font-size: 14px;
  }

  p:hover {
    background: #f5f5f5;
  }

  p {
    cursor: pointer;
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #f5f5f5;
  }
</style>
