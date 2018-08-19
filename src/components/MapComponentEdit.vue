<template>
  <div id="map"></div>
</template>

<script>

  import L from 'leaflet';

  export default {
    name: 'MapComponentEdit',
    components: {L},
    mounted() {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });

      this.map = L.map('map').setView([55.8050812, 49.1924942], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.marker([55.8050812, 49.1924942]).addTo(this.map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      this.map.on('click', this.onMapClick);
      this.popup = L.popup();

      // полином
      L.polyline([[55.8250812, 49.1924942], [55.8040812, 49.1944942], [55.8040812, 49.1924942]],
        {
          color: 'red',
          weight: 3,
          opacity: 0.5,
          smoothFactor: 1
        }).addTo(this.map);
    },
    data() {
      return {
        popup: null,
        map: null
      }
    },
    methods: {
      onMapClick: function (e) {
        // показать координаты
        // this.popup
        //   .setLatLng(e.latlng)
        //   .setContent(e.latlng.toString())
        //   .openOn(this.map);
      }
    }
  };
</script>
<style>
  #map {
    position: absolute;
    width: 100%;
    z-index: 1;
    background: #7f828b;
    z-index: 1;
    height: 100%;
    height: calc(100vh - 50px);
  }
</style>
