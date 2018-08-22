<template>
  <div>
    <Frame/>
    <MapComponent :geo="myGeoJson" :center="center" :zoom="12"/>
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
    },
    data() {
      return {
        center: [55.8050812, 49.1124942],

        freeBus: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "id": 1,
              "properties": {
                "name": "Alabama",
                "density": 94.65,
                "color": "orange",
                "weight": 5
              },
              "geometry": {
                "type": "Polygon",
                "coordinates": [[[49.198124, 55.787273], [49.198516, 55.782772], [49.187106, 55.785767], [49.192082, 55.776569], [49.197120, 55.771863], [49.195178, 55.768354]]]
              }
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
                "underConstruction": false,
                "color": "blue",
                "weight": "15",
                "dashArray": 1
              },
              "id": 3
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [49.1124942, 55.8050812],
                  [49.2114942, 55.8100812],
                  [49.2034532, 55.8110712],
                  [49.2124942, 55.8150812]
                ]
              },
              "properties": {
                "popupContent": "This is a free bus line that will take you across downtown.",
                "underConstruction": false,
                "color": "red",
                "dashArray": 1
              },
              "id": 4
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
                "underConstruction": false,
                "color": "green",
                "dashArray": 1,
                "weight": 6
              },
              "id": 5
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
                "underConstruction": false,
                "color": "black",
                "dashArray": 1
              },
              "id": 6
            }
          ]
        },
        myGeoJson: {
          options: {
            style: function (feature) {
              return {
                fillColor: 'green',
                weight: feature.properties.weight || 3,
                opacity: 0.7,
                color: feature.properties.color || 'orange',
                dashArray: feature.properties.dashArray || '12',
                fillOpacity: 0.2
              };
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
