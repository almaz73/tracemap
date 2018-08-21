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
              "properties": {"name": "Alabama", "density": 94.65},
              "geometry": {
                "type": "Polygon",
                "coordinates": [[[49.198124, 55.787273], [49.198516, 55.782772], [49.187106, 55.785767], [49.192082, 55.776569], [49.197120, 55.771863], [49.195178, 55.768354]]]
              },
              "style": {
                "stroke-width": "3",
                "fill-opacity": 0.6,
                "stroke": "#555555",
                "fill": "red",
                "fillColor": "red",
                "color": "blue"
              }
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [49.198124, 55.787273], [49.198516, 55.782772], [49.187106, 55.785767], [49.192082, 55.776569], [49.197120, 55.771863], [49.195178, 55.768354]
                ]
              },

              "className": {
                "baseVal": "highway_primary"
              },
              "properties": {
                "popupContent": "This is a free bus line that will take you across downtown."
              },
              "id": 2
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
                "underConstruction": false
              },
              "id": 3
            }
          ]
        },
        myGeoJson: {
          options: {
            style: function() {
              return {
                fillColor: 'green',
                weight: 3,
                opacity: 0.7,
                color: 'gray',
                dashArray: '2',
                fillOpacity: 0.2
              };
            },
            filter: function(feature, layer) {
              console.log(' .... val =', feature, layer)
              // if (feature.properties) {
              //   return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
              // }
              // return false;


              return {
                fillColor: 'red', // getColor(feature.properties.density),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
              };

            }
            // onEachFeature: onEachFeature
          }
        }
      }
    },
    created() {
      this.myGeoJson.geojson = this.freeBus
    }
  };
</script>
