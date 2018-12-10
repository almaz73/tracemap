<template>
  <div>
    <Wait v-if="wait"/>
    {{run}}
    <MotionPanel @close="isMotionPanel = false" v-if="isMotionPanel" :historyData="historyData"/>
  </div>
</template>

<script>
  import * as axios from 'axios';
  import L from 'leaflet';
  import application from '../assets/js/application';
  import '../assets/js/movingMarker';
  import Wait from "../components/Wait";
  import MotionPanel from '../components/MotionPanel';

  let cash = {};

  export default {
    name: "IntegrationBrigadeHistory",
    components: {Wait, MotionPanel},
    data() {
      return {
        points: [],
        oldBrigadeId: null,
        wait: false,
        isMotionPanel: true,
        historyData: {}
      }
    },
    computed: {
      run() {
        this.showPathBefore();
        return this.points.length
      }
    },
    methods: {
      async getHistory() {
        await axios.get('/ambulance/telematics/available-automobiles')
          .then(
            req => this.$emit('setCars', req.data),
            err => {
              this.$emit('setCars', [{stationName: '. . . нет данных . . . '}]);
              this.$store.dispatch('setNotification', err.response.data.message)
            }
          );
      },
      showCarTrace(bool, item) {
        this.points = [];
        if (!bool) return;
        this.wait = true;
        setTimeout(() => this.getCarTrace(item), 1);
      },
      async getCarTrace(item) {

        let examplePoints = [];
        let that = this;
        let letter = '/ambulance/telematics/history?automobileId=' + (item.automobileId || null);

        if (item.ordersId) letter += '&ordersId=' + item.ordersId;
        if (item.startDate) letter += '&startDate=' + item.startDate;
        if (item.endDate) letter += '&endDate=' + item.endDate;

        if (cash[letter]) doit(cash[letter]);
        else {
          await axios.get(letter)
            .then(
              resp => doit(resp),
              err => that.$store.dispatch('setNotification', err.response.data.message)
            )
        }

        function doit(resp) {
          cash[letter] = resp;
          if (resp && resp.data.routes && resp.data.routes.length) {
            resp.data.routes.map(el => {
              el.coordinates.map(item => {
                examplePoints.push(item.reverse())
              })
            });
          } else that.$store.dispatch('setNotification', 'Нет данных по движению');
        }

        this.wait = false;
        this.points = examplePoints; // наверно потом уберу  points
        this.historyData = examplePoints; //
      console.log('...... this.historyData =', this.historyData )
      },
      showPathBefore() {
        setTimeout(() => this.showPath(), 1);
      },
      showPath() {
        if (!application.map) return;

        if (this.poliline) application.map.removeLayer(this.poliline);
        if (this.marker) application.map.removeLayer(this.marker);

        if (this.points.length) {
          application.map.fitBounds(this.points); // граница для масштабирования по массиву
          this.poliline = L.polyline(this.points);
          this.marker = L.Marker.movingMarker(this.points, 10000, {
            autostart: true,
            loop: true
          });

          setTimeout(() => {
            application.map.addLayer(this.poliline);
            application.map.addLayer(this.marker);
          }, 1);
        }
      },
    },
    mounted() {
      this.getHistory();
      this.$root.$on('showCarTraces', this.showCarTrace)
    }
  }
</script>
