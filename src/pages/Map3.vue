<template>
  <div>
    <Frame/>
    {{myGeoJson}}
    <MapComponent :geo="myGeoJson" :center="center" :zoom="13"/>
  </div>
</template>

<script>
  import MapComponent from '@/components/MapComponent';
  import L from 'leaflet';
  import Frame from '@/components/Frame';
  import {default as data} from '../assets/sample-geojson';

  export default {
    name: 'Map3',
    components: {
      Frame,
      MapComponent,
      L
    },
    data() {
      return {
        zoom: 13,
        // center: [39.74732195489861, -105.00432014465332],
        center: [55.8050812, 49.1124942],
        url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWJvdWNoYXVkIiwiYSI6ImNpdTA5bWw1azAyZDIyeXBqOWkxOGJ1dnkifQ.qha33VjEDTqcHQbibgHw3w',
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        bus: {
          geojson: data.freeBus,
          options: {
            filter: function (feature, layer) {
              if (feature.properties) {
                return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
              }
              return false;
            }
            // onEachFeature: onEachFeature
          }
        },
        coors: {
          geojson: data.coorsField,
          options: {
            // pointToLayer: function (feature, latlng) {
            //   return L.marker(latlng, {icon: baseballIcon});
            // },
            // onEachFeature: onEachFeature
          }
        },
        bicycleAndCampus: {
          geojson: [data.bicycleRental, data.campus],
          options: {
            style: function (feature) {
              return feature.properties && feature.properties.style;
            },
            // onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
              });
            }
          }
        },
        freeBus: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [49.1124942, 55.8050812],
                  [49.2124942, 55.8150812]
                ]
              },
              "properties": {
                "popupContent": "This is a free bus line that will take you across downtown.",
                "underConstruction": false
              },
              "id": 1
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [-105.0008225440979, 39.751891803969535],
                  [-104.99820470809937, 39.74979664004068]
                ]
              },
              "properties": {
                "popupContent": "This is a free bus line that will take you across downtown.",
                "underConstruction": true
              },
              "id": 2
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [49.1114942, 55.8060812],
                  [49.1024942, 55.8060912]
                ]
              },
              "properties": {
                "popupContent": "This is a free bus line that will take you across downtown.",
                "underConstruction": false
              },
              "id": 3
            }
          ]
        },
        myGeoJson: {
          options: {
            filter: function (feature, layer) {
              if (feature.properties) {
                return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
              }
              return false;
            }
            // onEachFeature: onEachFeature
          }
        }
      }
    },
    created() {
      this.myGeoJson.geojson = this.freeBus
    }
  };
</script>
