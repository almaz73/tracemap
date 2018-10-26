<style scoped>
  .buttonDiv {
    position: absolute;
    z-index: 100;
    top: 150px;
    right: 10px;
  }

  button {
    display: block;
  }

  .b3 {
    top: 260px;
  }
</style>
<template>
  <div>
    <Frame :without="['Alert']"/>
    <cMap :points="points"/>
    <div class="buttonDiv">
      <button @click="getPoints()">запрос к серверу</button>
      <button @click="showKievKazan()">показать Киев Казань</button>
      <button @click="showKazanKiev()">показать Казань Киев</button>
      <button @click="showMore()">показать еще что-то</button>
      <button @click="showChebokNifteKamsk()">горизонталь</button>
      <button @click="showVert()">Вертикаль</button>
      <button @click="showNearBy()">Близко</button>
    </div>
  </div>
</template>

<script>
  import L from 'leaflet';
  import Frame from '../../draft/components/Frame'
  import cMap from '../components/cMap'

  export default {
    name: 'Map',
    components: {
      L,
      Frame,
      cMap
    },
    data() {
      return {
        center: [55.8050812, 49.1924942],
        zoon: 18,
        popup: null,
        map: null,
        points: undefined
      }
    },
    methods: {
      getPoints() {
        let me = this;
        this.$store.dispatch('getPoints').then(
          function () {
            me.points = me.$store.state.points
          },
          err => alert(err)
        );
      },
      showKievKazan() {
        this.points = [[50.45, 30.523333], [55.72711017944887, 49.34251539098401]]
      },
      showKazanKiev() {
        this.points = [[55.72711017944887, 49.34251539098401], [50.45, 30.523333]]
      },
      showMore() {
        this.points = [[55.72711017944887, 49.34251539098401], [51.61801665286038, 55.22977921318756],
          [46.25584693439189, 48.02387440542469], [56.968936285739645, 38.66546664263876], [55.57834476694432, 37.83063620759308]]
      },
      showChebokNifteKamsk() {
        this.points = [[56.090427143991555, 47.65869140625001], [56.090427143991555, 54.14062500000001]];
      },
      showVert() {
        this.points = [[52.696361078274485, 50.11962890625001], [50.63204218884234, 50.13061523437501]];
      },
      showNearBy() {
        this.points = [[55.756148179198206, 49.1795039176941], [55.756377595548855, 49.18890237808228], [55.760494785874464, 49.18877363204957]]
      }
    }
  }
  ;
</script>
