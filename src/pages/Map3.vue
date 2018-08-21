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
            filter: function(feature, layer) {
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
            style: function(feature) {
              return feature.properties && feature.properties.style;
            },
            // onEachFeature: onEachFeature,
            pointToLayer: function(feature, latlng) {
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
                  [49.2124942, 55.8150812],
                  [49.1114942, 55.8060812]
                ]
              },
              "properties": {
                "popupContent": "This is a free bus line that will take you across downtown.",
                "underConstruction": false
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
            style: function() {
              return {
                fillColor: 'red',
                weight: 12,
                opacity: 0.7,
                color: 'red',
                dashArray: '16',
                fillOpacity: 0.2
              };
            },
            filter: function(feature, layer) {
              console.log(' ...==. feature =', feature)
              if (feature.properties) {
                return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
              }
              return false;
            }
          }
        }
      }
    },
    created() {
      this.myGeoJson.geojson = this.freeBus
    }
  };
</script>
