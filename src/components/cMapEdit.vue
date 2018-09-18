<template>
  <div>

    <div id="map"></div>
    <div id='delete' v-show="showButtons">Удалить</div>
    <a href='#' id='export' v-show="showButtons">Сохранить</a>
  </div>
</template>

<script>
  // продуктовый
  import L from 'leaflet';
  import * as Draw from 'leaflet-draw';
  import '../assets/vendor/Leaflet.PolylineMeasure/PolylineMeasure';
  // import CONSTANTS from '../assets/js/constants';
  import application from '../assets/js/application';
  import * as integration from '../assets/js/integration';

  if (!Draw) alert('err');

  export default {
    name: 'CMapEdit',
    components: {L},
    props: {
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
        polylines: {},
        showMeasure: undefined
      }
    },
    methods: {
      onMapClick(e) {
        // показ координаты
        console.log('[' + e.latlng.lat + ', ' + e.latlng.lng + '],')
      },
      onMeasure() {
        this.showMeasure = false;
        function takePen(that) {
          if (!that.showMeasure && !!document.querySelector('.leaflet-control-scale-line')) {
            that.showMeasure = true;
            that.polylineMeasure._toggleMeasure();
          } else {
            setTimeout(() => takePen(that), 100);
          }
        }
        takePen(this)
      }
    },
    beforeDestroy() {
      let unsubscribe = this.$store.subscribe(this.onMeasure);
      unsubscribe();
    },
    computed: {
      showButtons() {
        let isSquare = this.$store.getters.tools.find(el => {
          return el.tool === 'square' && el.val === true
        });

        if (isSquare) {
          this.map && this.map.addControl(this.drawControl);
        } else {
          this.map && this.map.removeControl(this.drawControl);
        }

        let measure = this.$store.getters.tools.find(el => {
          return el.tool === 'line' && el.val === true
        });

        if (measure) {
          this.map && this.map.addControl(this.scale);
          this.map && this.map.addControl(this.polylineMeasure);
        } else {
          this.map && this.map.removeControl(this.scale);
          this.map && this.map.removeControl(this.polylineMeasure);
          this.polylineMeasure && this.polylineMeasure._clearAllMeasurements();
        }

        return isSquare;
      },
    },
    mounted() {
      this.$store.subscribe(this.onMeasure);

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });

      let tile = L.tileLayer(...application.tiles.googleStreets);
      this.map = new L.Map('map').addLayer(tile).setView(this.center, this.zoom);

      application.map = this.map;

      // инструменты изменения расстояний
      this.scale = L.control.scale({maxWidth: 240, metric: true, imperial: false, position: 'bottomleft'});
      this.polylineMeasure = L.control.polylineMeasure({
        position: 'bottomleft',
        unit: 'metres',
        showBearings: false,
        clearMeasurementsOnStop: false,
        showClearControl: false,
        showUnitControl: false
      });


      this.map.on('click', this.onMapClick);
      this.popup = L.popup();

      let drawnItems = new L.FeatureGroup();
      this.map.addLayer(drawnItems);

      this.drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
          polyline: {
            shapeOptions: {
              editing: {
                className: "",
                weight: 13
              },
              color: 'orange',
              className: ""
            }
          },
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: '#e1e100', // Color the shape will turn when intersects
              message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
              editing: {
                className: ""
              },
              color: '#97009c',
              weight: 3,
              className: ""
            }
          },
          marker: {
            shapeOptions: {
              editing: {
                className: ""
              },
              color: 'red',
              className: ""
            }
          },
          circle: {
            shapeOptions: {
              color: 'red',
              className: ""
            },
            className: ""
          },
          rectangle: {
            shapeOptions: {
              color: 'green',
              className: ""
            },
            className: ""
          }
        },
        edit: {
          featureGroup: drawnItems,
          edit: true
        }
      });

      this.map.on(L.Draw.Event.CREATED, function (e) {
        let layer = e.layer;
        drawnItems.addLayer(layer);
      });

      document.getElementById('delete').onclick = () => drawnItems.clearLayers();

      document.getElementById('export').onclick = function (e) {
        // Extract GeoJson from featureGroup
        var data = drawnItems.toGeoJSON();

        console.log("...geoJson=", data);

        // Stringify the GeoJson
        var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

        // Create export
        document.getElementById('export').setAttribute('href', 'data:' + convertedData);
        document.getElementById('export').setAttribute('download', 'data.geojson');
      }

      // интеграция, добавляется сокет и рисуется
      integration.initializeSockets();
      integration.draw(this.map);
      integration.click()
    }
  };
</script>
<style>
  @import "../assets/vendor/Leaflet.draw/style.css";
  @import "../assets/vendor/Leaflet.PolylineMeasure/PolylineMeasure.css";

  #delete, #export, .leaflet-draw-section {
    border: none;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
  }

  #delete:hover, #export:hover {
    background: #f2f2f2;
  }
</style>
