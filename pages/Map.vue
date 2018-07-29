<template>
  <div>
    <Frame/>
    <MapComponent class="map"></MapComponent>
  </div>

</template>

<script>
  import MapComponent from '~/components/MapComponent.vue';
  import Frame from '~/components/Frame.vue'

  export default {
    name: 'Map',
    components: {
      MapComponent, Frame
    }
  }
</script>

<style>
  .map {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
</style>
