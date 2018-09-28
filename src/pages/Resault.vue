<template>
  <div>
    <!--<div style="background: red; z-index: 100">!!!!{{$store.state}}</div>-->
    <cMapEdit :tile="tile"/>
    <cMenuSearch/>
    <cTool v-if="$store.state.isShowTool" :showLayers="layers.length>0" :showCars="cars.length>0"/>
    <cLayers v-if="isLayers && $store.state.isShowTool" :layers="layers"/>
    <cCarLayers v-if="isCar" :layers="cars"/>
    <cCarCombobox v-if="isCar2 && $store.state.isShowTool"/>
    <Integration @setTile="setTile"/>
    <IntegrationLayers @setLayer="setLayer"/>
    <IntegrationHistoryCarMove @setCars="setCars"/>
  </div>
</template>

<script>
  // продуктовый
  import cMapEdit from "../components/cMapEdit"
  import cMenuSearch from "../components/cMenuSearch"
  import cTool from "../components/cTool"
  import cLayers from "../components/cLayers"
  import cCarLayers from "../components/cCarLayers"
  import cCarCombobox from "../components/cCarCombobox"
  import Integration from "./Integration"
  import IntegrationLayers from './IntegrationLayers'
  import IntegrationHistoryCarMove from "./IntegrationHistoryCarMove"

  export default {
    name: "Resault",
    components: {
      IntegrationHistoryCarMove,
      IntegrationLayers,
      Integration,
      cMapEdit,
      cMenuSearch,
      cTool,
      cLayers,
      cCarLayers,
      cCarCombobox
    },
    data() {
      return {
        layers: [],
        tile: null,
        cars: [
          {
            regNum: 'HHHH1',
            id: 1,
            children: [{
              regnum: 'AAA1',
              id: 11
            }, {
              regnum: 'AAA2',
              id: 12
            }, {
              regnum: 'AAA3',
              id: 13
            }]
          }, {
            regNum: 'HHHH2',
            id: 2
          }, {
            regNum: 'HHHH3',
            id: 3
          }, {
            regNum:
              'HHHH4',
            id: 4
          }, {
            regNum: 'HHHH5',
            id: 5
          }
        ]
      }
    },
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
      },
      isCar2() {
        return this.$store.getters.tools.find(el => {
          return el.tool === 'car2' && el.val === true
        });
      }
    },
    methods: {
      setLayer(val) {
        this.layers = val;
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
