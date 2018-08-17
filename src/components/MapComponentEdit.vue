<template>
  <div id="map"></div>
</template>

<script>

  import L from 'leaflet';
  // import {LMap, LTileLayer, LCircle, LRectangle, LPolygon, LPolyline, LMarker, LPopup, LGeoJson} from 'vue2-leaflet';

  export default {
    name: 'MapComponentEdit',
    components: {L},
    props: {
      zoom: {
        default: 11,
        type: Number,
        validator: val => {
          // ругается до преверки здесь
          let valid = (typeof val === "number");
          if (!valid) console.error('Значение должно быть числом!');
          return valid;
        }
      }, // Масштаб отображения
      position: {
        // default() {
        //   return {lat: 55.8050812, lng: 49.1924942}
        // },
        type: Object
      }, // Позиция маркера
      center: {
        // required: true,
        default() {
          return [55.8050812, 49.1124942]
        },
        type: Array
      },
      geo: {
        type: Object
        // default() {
        //   return {
        //     center: L.latLng(55.8050812, 49.1124942),
        //     radius: 4500
        //   }
        // }
      },
      circle: {
        type: Object
        // default() {
        //   return {
        //     center: L.latLng(55.8050812, 49.1124942),
        //     radius: 4500
        //   }
        // }
      },
      rectangle: {
        type: Object
        // default() {
        //   return {
        //     bounds: [[55.8000812, 49.1314942], [55.8050812, 49.1524942]],
        //     style: {color: '#ff7800', weight: 12}
        //   }
        // }
      },
      polygon: {
        type: Object
        // default() {
        //   return {
        //     latlngs: [[55.8150812, 49.1224942], [55.8050812, 49.1124942], [55.8250812, 49.1024942], [55.8020812, 49.1104942], [55.8050812, 49.1124942], [55.8010812, 49.1125942]],
        //     color: '#ff00ff'
        //   }
        // }
      },
      polyline: {
        type: Object
        // default() {
        //   return {
        //     latlngs: [[54.8050812, 49.1124942], [54.8150812, 49.1124942], [54.8050812, 49.1524942], [55.8050812, 49.0024942]],
        //     color: 'green'
        //   }
        // }
      },
      url: {
        type: String,
        default: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      },
      attribution: {
        type: String,
        default: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      },
      text: {
        type: String,
        default: null
      }
    },
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
