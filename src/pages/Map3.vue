<template>
  <div>
    <Frame :without="['Alert']"/>
    <CMapMovie />
  </div>
</template>

<script>
  import CMapMovie from "../components/CMapMovie";
  import L from 'leaflet';
  import Frame from '@/components/Frame';

  export default {
    name: 'Map3',
    components: {
      Frame,
      CMapMovie,
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
        'Imagery © <a href="http://mapbox.com">Mapbox</a>'
      }
    }
  };
</script>
