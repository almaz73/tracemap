<template>
  <div>
    <Frame/>
    <MapComponent />
  </div>
</template>

<script>
import MapComponent from '@/components/MapComponent';
import Frame from '@/components/Frame';

export default {
  name: 'Map2',
  components: {
    Frame,
    MapComponent
  }
};
</script>
