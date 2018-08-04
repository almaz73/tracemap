<template>
  <div>
    <Frame/>
    <MapComponent class="map"></MapComponent>
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

<style>
  .map {
    position: absolute;
    /*height: calc(100vh - 170px);*/
    width: 100%;
    z-index: 1;
  }
</style>
