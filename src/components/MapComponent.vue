<template>
<div>

 <div id="map-wrap">
   <l-map :zoom="zoom" :center="center">
     <l-tile-layer :url="url"></l-tile-layer>
     <!--<l-marker :lat-lng="marker"></l-marker>-->
   </l-map>
 </div>
</div>
</template>

<script>

import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: 'MapComponent',
  components: { L, LMap, LTileLayer, LMarker },
  data() {
    return {
      zoom: 13,
      center: L.latLng(55.8050812, 49.1124942),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      marker: L.latLng(55.8050812, 49.1124942)
    };
  }
};
</script>
<style>
  @import "leaflet/dist/leaflet.css";
  #map-wrap {
    height: calc(100vh - 50px);
  }
</style>
