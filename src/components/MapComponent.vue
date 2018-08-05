<template>
<div>

 <div id="map-wrap">
   <l-map :zoom="zoom" :center="center">
     <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
     <l-circle :lat-lng="circle.center" :radius="circle.radius"></l-circle>
     <l-rectangle :bounds="rectangle.bounds" :l-style="rectangle.style"></l-rectangle>
     <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color"></l-polygon>
     <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
     <l-marker :lat-lng="position" :draggable="false">
       <l-popup :content="text"></l-popup>
     </l-marker>
   </l-map>
 </div>
</div>
</template>

<script>

import L from 'leaflet';
import {LMap, LTileLayer, LCircle, LRectangle, LPolygon, LPolyline, LMarker, LPopup} from 'vue2-leaflet';

export default {
  name: 'MapComponent',
  components: {L, LMap, LTileLayer, LCircle, LRectangle, LPolygon, LPolyline, LMarker, LPopup},
  data() {
    return {
      zoom: 11,
      center: [55.8050812, 49.1124942],
      circle: {
        center: L.latLng(55.8050812, 49.1124942),
        radius: 4500
      },
      rectangle: {
        bounds: [[55.8000812, 49.1314942], [55.8050812, 49.1524942]],
        style: {color: '#ff7800', weight: 12}
      },
      polygon: {
        latlngs: [[55.8150812, 49.1224942], [55.8050812, 49.1124942], [55.8250812, 49.1024942], [55.8020812, 49.1104942], [55.8050812, 49.1124942], [55.8010812, 49.1125942]],
        color: '#ff00ff'
      },
      polyline: {
        latlngs: [[54.8050812, 49.1124942], [54.8150812, 49.1124942], [54.8050812, 49.1524942], [55.8050812, 49.0024942]],
        color: 'green'
      },
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
      text: 'Дополнительное сообщение',
      position: {lat: 55.8050812, lng: 49.1924942}
    };
  },
  created() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
  }
};
</script>
<style>
  #map-wrap {
    height: calc(100vh - 50px);
  }
</style>
