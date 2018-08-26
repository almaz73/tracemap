<template>
  <div id="map"></div>
</template>

<script>

  import L from 'leaflet';
  import '../../assets/vendor/Leaflet.MovingMarker/MovingMarker';

  export default {
    name: 'MapComponentEdit',
    components: {L},
    props: {
      layers: {
        type: Array
      },
      center: {
        type: Array,
        default: () => [55.8050812, 49.1924942]
      },
      zoom: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {
        popup: null,
        map: null,
        polylines: {}
      }
    },
    methods: {
      onMapClick(e) {
        console.log('[' + e.latlng.lat + ', ' + e.latlng.lng + '],')
      }
    },
    mounted() {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
      });

      this.map = L.map('map').setView(this.center, this.zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.map.on('click', this.onMapClick);
      this.popup = L.popup();


      /// ЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖ

      var kievKazan = [[50.45, 30.523333], [55.72711017944887, 49.34251539098401]];
      var kazanOrenburgAstrhanZroslavlMoskow = [[55.72711017944887, 49.34251539098401], [51.61801665286038, 55.22977921318756],
        [46.25584693439189, 48.02387440542469], [56.968936285739645, 38.66546664263876], [55.57834476694432, 37.83063620759308]];
      var voronezhUfaChelntSaratovLOOP = [[51.56341243288777, 39.23607571866635],
        [48.63290869668414, 44.55262743658895],
        [54.67383106286457, 55.97662286353013],
        [55.70235518773366, 52.46154734754822],
        [51.56341243288777, 47.49650318122379]];
      var randomPath = [
        [59.15340317800532, 44.73172619634835],
        [58.58543577857659, 53.7391072060519],
        [57.11238509896031, 43.98477264920217],
        [56.194480970539466, 46.2695717345904],
        [57.27904285559423, 49.56495503082343],
        [56.17002307626124, 52.50883077545826]
      ];


      this.map.fitBounds(kazanOrenburgAstrhanZroslavlMoskow); // Важная граница для масштабирования
      // -=-=-=-=-=-=-=-=-=-=-=-=-=-=



// ================по нажатию на маркер поедет========================================================
      var marker1 = L.Marker.movingMarker(kievKazan, [1000]).addTo(this.map);
      L.polyline(kievKazan).addTo(this.map);
      marker1.once('click', function() {
        marker1.start();
        marker1.closePopup();
        marker1.unbindPopup();
        marker1.on('click', function() {
          if (marker1.isRunning()) {
            marker1.pause();
          } else {
            marker1.start();
          }
        });
        setTimeout(function() {
          marker1.bindPopup('<b>Click me to pause !</b>').openPopup();
        }, 2000);
      });

      marker1.bindPopup('<b>Click me to start !</b>', {closeOnClick: false});
      marker1.openPopup();

// =======================сам запускается и равномерно едет=================================================

      var marker2 = L.Marker.movingMarker(kazanOrenburgAstrhanZroslavlMoskow,
        [1000, 3000, 4000, 2000], {autostart: true}).addTo(this.map);
      L.polyline(kazanOrenburgAstrhanZroslavlMoskow, {color: 'red'}).addTo(this.map);


      marker2.on('end', function() {
        marker2.bindPopup('<b>Welcome to Moscow !</b>', {closeOnClick: false})
          .openPopup();
      });

// ===============только иконка движется без траектории=========================================================

      var marker3 = L.Marker.movingMarker(voronezhUfaChelntSaratovLOOP,
        [2000, 2000, 2000, 2000], {autostart: true, loop: true}).addTo(this.map);

      marker3.loops = 0;
      marker3.bindPopup('', {closeOnClick: false});

// ===========================движение к нажатой точке==============================================

      var marker4 = L.Marker.movingMarker([[55.72711017944887, 49.34251539098401]], []).addTo(this.map);

      marker3.on('loop', function(e) {
        marker3.loops++;
        if (e.elapsedTime < 50) {
          marker3.getPopup().setContent("<b>Loop: " + marker3.loops + "</b>")
          marker3.openPopup();
          setTimeout(function() {
            marker3.closePopup();

            if (!marker1.isEnded()) {
              marker1.openPopup();
            } else {
              if (marker4.getLatLng().equals([45.816667, 15.983333])) {
                marker4.bindPopup('Click on the map to move me !');
                marker4.openPopup();
              }

            }

          }, 2000);
        }
      });

      this.map.on("click", function(e) {
        marker4.moveTo(e.latlng, 2000);
      });

// ================ с остановками =========================================================

      var marker5 = L.Marker.movingMarker(randomPath, 5000, {autostart: true}).addTo(this.map);

      marker5.addStation(1, 2000);
      marker5.addStation(2, 2000);
      marker5.addStation(3, 2000);
      marker5.addStation(4, 2000);

      L.polyline(randomPath,
        {color: 'green'}).addTo(this.map);

    }
  };
</script>
<style>
  #map {
    position: absolute;
    width: 100%;
    z-index: 1;
    z-index: 1;
    height: 100%;
    height: calc(100vh - 50px);
  }
</style>
