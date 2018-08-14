<template>
  <div>
    <Frame/>
    <MapComponent :geo="bicycleAndCampus"/>
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
        center: [39.74739, -105],
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
        }
      }
    }
  };
</script>
