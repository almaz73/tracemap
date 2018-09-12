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
        polylines: {}
      }
    },
    methods: {
      onMapClick(e) {
        // показ координаты
        console.log('[' + e.latlng.lat + ', ' + e.latlng.lng + '],')
      },
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

        if(measure) {
          this.map && this.map.addControl(this.scale);
          this.map && this.map.addControl(this.polylineMeasure);
        }else {
          this.map && this.map.removeControl(this.scale);
          this.map && this.map.removeControl(this.polylineMeasure);
          this.polylineMeasure && this.polylineMeasure._clearAllMeasurements();
        }

        return isSquare;
      },
    },
    mounted() {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });

      // this.map = L.map('map').setView(this.center, this.zoom);
      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(this.map);

      let osm =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
      let yandex = L.tileLayer('http://vec{s}.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU', {
        subdomains: ['01', '02', '03', '04'],
        attribution: '<a http="yandex.ru" target="_blank">Яндекс</a>',
        reuseTiles: true,
        updateWhenIdle: false
      });
      let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{ maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']});
      let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{maxZoom: 20,subdomains:['mt0','mt1','mt2','mt3']});
      let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{maxZoom: 20,subdomains:['mt0','mt1','mt2','mt3']});
      let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{maxZoom: 20,subdomains:['mt0','mt1','mt2','mt3']});
      let layerOsm = new L.TileLayer ('https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {subdomains:['server','services'], maxZoom:19, noWrap:false, attribution:'<a href="https://www.arcgis.com/">ArcGIS</a>' });
      this.map = new L.Map ('map').addLayer (googleStreets).setView (this.center, this.zoom);

      // инструменты изменения расстояний
      this.scale = L.control.scale ({maxWidth:240, metric:true, imperial:false, position: 'bottomleft'});
      this.polylineMeasure = L.control.polylineMeasure ({position:'bottomleft', unit:'metres', showBearings:false, clearMeasurementsOnStop: false, showClearControl: false, showUnitControl: false});




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
