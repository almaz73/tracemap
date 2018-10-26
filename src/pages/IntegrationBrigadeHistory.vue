<template>
  <div>
    <Wait v-if="wait"/>
    {{run}}
  </div>
</template>

<script>
  import * as axios from 'axios';
  import L from 'leaflet';
  import application from '../assets/js/application';
  import '../assets/js/movingMarker';
  import Wait from "../components/Wait";

  export default {
    name: "IntegrationBrigadeHistory",
    components: {Wait},
    data() {
      return {
        points: [],
        oldBrigadeId: null,
        wait: false
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
            err => this.$store.dispatch('setNotification', err.response.data.message)
          );
      },
      showCarTrace(id, bool) {
        this.points = [];

        // из сторе удаляем все ранее выбранные бригады
        this.$store.getters.brigades.map(el => typeof el === 'number' && el !== id && this.$store.dispatch('setBrigade', el));

        if (!bool) return;
        this.wait = true;

        setTimeout(() => this.getCarTrace(id), 1);
      },
      async getCarTrace(id) {
        // todo нужен инструмент выбора времени просмотре
        let today = new Date();
        let yesterday = new Date();
        // yesterday.setDate(yesterday.getDate() - 1);
        let todayTxt = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T10:09:12.000';
        let yesterdayTxt = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate() + 'T08:08:02.000';
        let examplePoints = [];
        let that = this;

        await axios.get(`/ambulance/telematics/history?automobileId=${id}&startDate=${yesterdayTxt}&endDate=${todayTxt}`)
          .then(
            resp => {
              if (resp && resp.data.routes && resp.data.routes.length) resp.data.routes.map(el => el.coordinates.map(item => examplePoints.push(item.reverse())));
              else that.$store.dispatch('setNotification', 'Нет данных по движению');
            },
            err => {
              that.$store.dispatch('setNotification', err.response.data.message)
            }
          );

        this.wait = false;
        this.points = examplePoints;

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
