<template>
  <div>
    <Notification/>

    <!--<div style="background: orange; z-index: 100">{{this.$store.getters.tools}}</div>-->
    <!--<div style="background: orange; z-index: 100">{{this.$root.username}}</div>-->
    <!--<div style="background: orange; z-index: 100">{{$store.state}}</div>-->
    <!--<div style="background: orange; z-index: 100">{{$store.state.editLayers}}</div>-->
    <!--<div style="background: orange; z-index: 1000">{{$store.state.brigades}}</div>-->
    <!--<div style="background: greenyellow; z-index: 1000" >{{$store.state.selectedBrigade}}</div>-->
    <!--<div style="background: orange; z-index: 100">{{$store.state.notifications}}</div>-->
    <!--<div style="background: orange; position: absolute; z-index: 100; opacity: 0.5">...{{$store.getters.notifications[0]}}</div>-->

    <Map :tile="tile"/>
    <PlusSearch style="opacity: 5"/>
    <Tools v-if="$store.state.isShowTool" :showLayers="objectLayers.length>0"
           :showCars="cars.length>0"/>
    <Zones v-if="isObjectLayers && $store.state.isShowTool" :objectLayers="objectLayers"/>
    <Brigades v-if="isCar && $store.state.isShowTool" :layers="cars"/>
    <Integration @setTile="setTile"/>
    <IntegrationZones @setLayer="setLayer"/>
    <IntegrationBrigadeHistory @setCars="setCars"/>
  </div>
</template>

<script>
  // продуктовый
  import Map from "../components/Map"
  import PlusSearch from "../components/NavigationButtons/PlusSearch"
  import Tools from "../components/NavigationButtons/Tools"
  import Zones from "../components/combobox/Zones"
  import Brigades from "../components/combobox/Brigades"
  import cCarCombobox from "../draft/components/cCarCombobox"
  import Integration from "./Integration"
  import IntegrationZones from './IntegrationZones'
  import IntegrationBrigadeHistory from "./IntegrationBrigadeHistory"
  import Notification from "../components/Notification";

  import Legend from "../components/Legend";

  export default {
    name: "Resault",
    components: {
      Legend,
      IntegrationBrigadeHistory,
      IntegrationZones,
      Integration,
      Map,
      PlusSearch,
      Tools,
      Zones,
      Brigades,
      cCarCombobox,
      Notification
    },
    data() {
      return {
        objectLayers: [],
        tile: null,
        cars: [],
      }
    },
    computed: {
      isObjectLayers() {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'objectLayers' && el.val === true
        });
      },
      isCar() {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'car' && el.val === true
        });
      }
    },
    methods: {
      setLayer(val) {
        this.objectLayers = val;
      },
      setTile(val) {
        this.tile = val;
      },
      setCars(val) {
        this.cars = val;
      }
    }
  }
</script>
