<template>
  <div id="map">{{run}}</div>
</template>

<script>

  import L from 'leaflet';
  import '../assets/js/movingMarker';

  export default {
    name: 'CMapMovie',
    components: {L},
    props: {
      layers: {
        type: Array
      },
      center: {
        type: Array,
        default: () => [55.8050812, 49.1924942]
      },
      zoom: {
        type: Number,
        default: 11
      },
      points: {
        type: Array,
        default: () => [[51.56341243288777, 39.23607571866635], [48.63290869668414, 44.55262743658895]]
      }
    },
    data() {
      return {
        popup: null,
        map: null,
        poliline: null,
        marker: null
      }
    },
    computed: {
      run() {
        // setTimeout(() => this.showPath(), 1);
        this.showPathBefore();
        return this.points.length
      }
    },
    methods: {
      showPathBefore() {
        setTimeout(() => this.showPath(), 1);
      },
      showPath() {
        if (!this.map) return;

        if (this.poliline) this.map.removeLayer(this.poliline);
        if (this.marker) this.map.removeLayer(this.marker);

        this.map.fitBounds(this.points); // граница для масштабирования по массиву

        this.poliline = L.polyline(this.points);
        this.marker = L.Marker.movingMarker(this.points, 10000, {
          autostart: true,
          loop: true
        });

        setTimeout(() => {
          this.map.addLayer(this.poliline);
          this.map.addLayer(this.marker);
        }, 1);
      },
      onMapClick(e) {
        console.log('[' + e.latlng.lat + ', ' + e.latlng.lng + '],')
      }
    },
    mounted() {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });

      this.map = L.map('map').setView(this.center, this.zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.map.on('click', this.onMapClick);

    }
  };
</script>
<style>
  #map {
    position: absolute;
    width: 100%;
    z-index: 1;
    z-index: 1;
    height: 100%;
    height: calc(100vh - 50px);
  }

  .car {
    position: absolute;
    top: -12px;
    left: -21.5px;
    z-index: 2;
    /*transform: rotate(-210deg) !important;*/
  }
  .my-car{
    /*background: red;*/
    opacity: 0.6;
  }
</style>
