<template>
  <div>
    <Frame/>
    <MapComponent :zoom="9"
                  :center="[55.8050812, 49.1124942]"
                  :circle="{center: {lat: 55.8050812, lng: 49.1124942}, radius: 4500}"
                  :rectangle="{bounds: [[55.8000812, 49.1314942], [55.8050812, 49.1524942]], style: {color: '#ff7800', weight: 12}}"
                  :polygon="{latlngs: [[55.8150812, 49.1224942], [55.8050812, 49.1124942], [55.8250812, 49.1024942], [55.8020812, 49.1104942],
                  [55.8050812, 49.1124942], [55.8010812, 49.1125942]],color: '#ff00ff'}"
                  :polyline="{latlngs: [[54.8050812, 49.1124942], [54.8150812, 49.1124942], [54.8050812, 49.1524942], [55.8050812, 49.0024942]],color: 'green'}"
                  :position="{lat: 55.8050812, lng: 49.1924942}"
                  :text="'Маркер'"
    ></MapComponent>
  </div>
</template>

<script>
  import MapComponent from '@/components/MapComponent';
  import Frame from '@/components/Frame';

  export default {
    name: 'Map',
    components: {
      Frame,
      MapComponent
    }
  };
</script>
