<template>
  <div>
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
    <BrigadeWayHistory v-if="isBrigadeWayHistory"/>
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

  export default {
    name: "Resault",
    components: {
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
        cars: [
          {
            stationName: 'HHH stationName111',
            id: 1,
            automobiles: [{
              regNum: 'BRIGADA111',
              id: 111
            }, {
              regNum: 'BRIGADA222',
              id: 2222
            }],
            children: [{
              stationName: 'AAA stationName222',
              id: 11,
              children: [{
                id: 44,
                stationName: 'HHHH stationName333',
                automobiles: [{
                  regNum: '999 BRIGADA>>>111',
                  id: 222220
                }, {
                  regNum: '999 BRIGADA>>>222',
                  id: 222221
                }],
              }],
              automobiles: [{
                regNum: '888 BRIGADA>>>111',
                id: 2222720
              }, {
                regNum: '888 BRIGADA>>>222',
                id: 2227221
              }],
            }, {
              stationName: 'AAA444',
              id: 12
            }, {
              stationName: 'AAA555',
              id: 13
            }]
          }, {
            stationName: 'HHHH stationName 66',
            id: 2,
            children: [{
              id: 4422,
              stationName: 'HHHH stationName333',
            }]
          }, {
            stationName: 'HHHH stationName777',
            id: 3
          }, {
            stationName: 'HHH stationName 888',
            id: 4,
            automobiles: [{
              regNum: '999 BRIGADA111',
              id: 9990
            }, {
              regNum: '999 BRIGADA222',
              id: 9991
            }],
            children: [{
              stationName: '999 stationName AAA222',
              id: 9993,
              children: [{
                id: 9995,
                stationName: '999 stationName HHHH333'
              }]
            }, {
              stationName: '999 stationName AAA444',
              id: 9996
            }, {
              stationName: '999 vAAA555',
              id: 9997
            }]
          }, {
            stationName: 'HHH stationName 9',
            id: 5
          }
        ],
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
