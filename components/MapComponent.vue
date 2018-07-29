<template>
<div>
  <div id="map-wrap" v-if="browser">
    <v-map :zoom=12
           :center="[markers[0].lat, markers[0].lng]">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-marker v-for="marker in markers" :key="marker.id" :lat-lng="[marker.lat, marker.lng]"></v-marker>
    </v-map>
  </div>
</div>
</template>

<script>
  export default {
    name: 'MapComponent',
    ssr: false,
    data() {
      return {
        browser: process.browser,
        markers: [
          {id: 1, lat: 55.8050812, lng: 49.1124942 },
          {id: 2, lat: 49.8350812, lng: 55.1434942 }
        ]
      }

    }
  }
</script>
<style>
  #map-wrap {
    height: 100%;
    width: 100%;
  }

</style>
