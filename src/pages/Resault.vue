<template>
  <div>
    <ModalChoiseDate v-if="isBrigadeWayHistory" @close="isBrigadeWayHistory=false"/>
    <Notification/>

    <!--<div style="background: orange; z-index: 100">{{this.$root.username}}</div>-->
    <!--<div style="background: orange; z-index: 100">{{$store.state}}</div>-->
    <!--<div style="background: orange; z-index: 100">{{$store.state.editLayers}}</div>-->
    <!--<div style="background: orange; z-index: 100">{{$store.state.brigades}}</div>-->
    <!--<div style="background: orange; z-index: 100">{{$store.state.notifications}}</div>-->
    <!--<div style="background: orange; position: absolute; z-index: 100; opacity: 0.5">...{{$store.getters.notifications[0]}}</div>-->

    <Questions v-if="this.$root.username"/>
    <Map :tile="tile"/>
    <PlusSearch/>
    <Tools v-if="$store.state.isShowTool" :showLayers="objectLayers.length>0"
           :showCars="cars.length>0"/>
    <Zones v-if="isObjectLayers && $store.state.isShowTool" :objectLayers="objectLayers"/>
    <Brigades v-if="isCar && $store.state.isShowTool" :layers="cars"/>
    <cCarCombobox v-if="isCar2 && $store.state.isShowTool"/>
    <Integration @setTile="setTile"/>
    <IntegrationZones @setLayer="setLayer"/>
    <IntegrationBrigadeHistory @setCars="setCars"/>
    <BrigadeWayHistory v-if="isBrigadeHistory"/>
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

  import Questions from "../draft/Components/Questions"
  import BrigadeWayHistory from "../components/combobox/BrigadeWayHistory";
  import Legend from "../components/Legend";
  import ModalChoiseDate from "../components/combobox/ModalChoiseDate";

  export default {
    name: "Resault",
    components: {
      ModalChoiseDate,
      Legend,
      BrigadeWayHistory,
      IntegrationBrigadeHistory,
      IntegrationZones,
      Integration,
      Map,
      PlusSearch,
      Tools,
      Zones,
      Brigades,
      cCarCombobox,
      Notification,
      Questions
    },
    data() {
      return {
        objectLayers: [],
        tile: null,
        cars: [],
        isBrigadeWayHistory: false
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
      },
      isCar2() {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'car2' && el.val === true
        });
      },
      isBrigadeHistory() {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'brigadeHistory' && el.val === true
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
    },
    mounted() {
      this.$root.$on('showBrigadeWayHistory', id => {
        this.isBrigadeWayHistory = !this.isBrigadeWayHistory;
      })

    }
  }
</script>
