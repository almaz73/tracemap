<template>
  <div>
    <!--<div style="background: red; z-index: 100">!!!!{{$store.state}}</div>-->
    <cMapEdit/>
    <cMenuSearch/>
    <cTool v-if="$store.state.isShowTool"/>
    <cLayers v-if="isLayers && $store.state.isShowTool"/>
    <cCarCombobox v-if="isCar && $store.state.isShowTool"/>
    <Integration/>
  </div>
</template>

<script>
  // продуктовый
  import cMapEdit from "../components/cMapEdit"
  import cMenuSearch from "../components/cMenuSearch"
  import cTool from "../components/cTool"
  import cLayers from "../components/cLayers"
  import cCarCombobox from "../components/cCarCombobox"
  import Integration from "./Integration";

  export default {
    name: "Resault",
    components: {Integration, cMapEdit, cMenuSearch, cTool, cLayers, cCarCombobox},
    computed: {
      isLayers() {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'layers' && el.val === true
        });
      },
      isCar() {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'car' && el.val === true
        });
      }
    }
  }
</script>

<style scoped>

</style>
