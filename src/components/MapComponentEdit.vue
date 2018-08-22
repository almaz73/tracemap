<template>
  <div id="map"></div>
</template>

<script>

  import L from 'leaflet';

  export default {
    name: 'MapComponentEdit',
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
        default: 13
      }
    },
    data() {
      return {
        popup: null,
        map: null,
        polylines: {}
      }
    },
    methods: {
      onMapClick(e) {
        // показать координаты
        // this.popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(this.map);
        console.log('[' + e.latlng.lat + ', ' + e.latlng.lng + '],')
      },
      update(state) {
        if (state.type === "setEditLayer") this.updateLayers(state)
      },
      updateLayers() {
        this.layers.map(el => {
          if (this.$store.state.editLayers.indexOf(el.name) > -1) {
            if (this.polylines[el.name] || !el.polyline) return;
            this.polylines[el.name] = new L.Polyline([el.polyline], {color: 'green', weight: 5, opacity: 0.5});
            this.map.addLayer(this.polylines[el.name]);
          } else {
            if (this.polylines[el.name]) {
              this.map.removeLayer(this.polylines[el.name]);
              delete this.polylines[el.name];
            }
          }
        });
      }
    },
    beforeDestroy() {
      // отписываемся от подписки
      let unsubscribe = this.$store.subscribe(this.update);
      unsubscribe();
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
      this.popup = L.popup();

      this.$store.subscribe(this.update);
      this.updateLayers();

      L.marker(this.center).addTo(this.map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      // полином добавлен отдельно
      L.polyline([[55.8250812, 49.1924942], [55.8040812, 49.1944942], [55.8040812, 49.1924942]],
        {
          color: 'red',
          weight: 3,
          opacity: 0.5,
          smoothFactor: 1
        }).addTo(this.map);
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
</style>
