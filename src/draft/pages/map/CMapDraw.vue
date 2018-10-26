<template>
  <div>
    <div id="map"></div>
    <div id='delete'>Удалить</div>
    <a href='#' id='export'>Сохранить</a>
  </div>
</template>

<script>

  import L from 'leaflet';
  import * as Draw from 'leaflet-draw';

  if (!Draw) alert('err');

  export default {
    name: 'CMapDraw',
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
        // показать координаты
        // this.popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(this.map);
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
      this.popup = L.popup();

      let drawnItems = new L.FeatureGroup();
      this.map.addLayer(drawnItems);


      // var MyCustomMarker = L.Icon.extend({
      //   options: {
      //     shadowUrl: null,
      //     iconAnchor: new L.Point(12, 12),
      //     iconSize: new L.Point(24, 24),
      //     iconUrl: '../assets/images/pen.jpg'
      //   }
      // });

      let drawControl = new L.Control.Draw({
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
            // icon: new MyCustomMarker()
            shapeOptions: {
              editing: {
                className: ""
              },
              color: 'red',
              className: ""
            }
          },
          rectangle: {
            shapeOptions: {
              color: 'green',
              className: ""
            },
            className: ""
          },
          circle: false
        },
        edit: {
          featureGroup: drawnItems,
          edit: true
          // Delete still remains useable
        }
      });

      this.map.addControl(drawControl);

      this.map.on(L.Draw.Event.CREATED, function (e) {
        // let type = e.layerType
        let layer = e.layer;
        drawnItems.addLayer(layer);
      });

      document.getElementById('delete').onclick = () => drawnItems.clearLayers();

      document.getElementById('export').onclick = function (e) {
        // Extract GeoJson from featureGroup
        var data = drawnItems.toGeoJSON();

        console.log("...geoJson=", data)

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
  @import "../../../assets/vendor/Leaflet.draw/style.css";
</style>
