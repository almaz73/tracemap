<template>
  <div id="map"></div>
</template>

<script>

  import L from 'leaflet';

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
        default: 13
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
        // показать координаты
        // this.popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(this.map);
        console.log('[' + e.latlng.lat + ', ' + e.latlng.lng + '],')
      }
    },
    mounted() {


      L.interpolatePosition = function (p1, p2, duration, t) {
        var k = t / duration;
        k = (k > 0) ? k : 0;
        k = (k > 1) ? 1 : k;
        return L.latLng(p1.lat + k * (p2.lat - p1.lat),
          p1.lng + k * (p2.lng - p1.lng));
      };

      L.Marker.MovingMarker = L.Marker.extend({

        // state constants
        statics: {
          notStartedState: 0,
          endedState: 1,
          pausedState: 2,
          runState: 3
        },

        options: {
          autostart: false,
          loop: false
        },

        initialize: function (latlngs, durations, options) {
          L.Marker.prototype.initialize.call(this, latlngs[0], options);

          this._latlngs = latlngs.map(function (e, index) {
            return L.latLng(e);
          });

          if (durations instanceof Array) {
            this._durations = durations;
          } else {
            this._durations = this._createDurations(this._latlngs, durations);
          }

          this._currentDuration = 0;
          this._currentIndex = 0;

          this._state = L.Marker.MovingMarker.notStartedState;
          this._startTime = 0;
          this._startTimeStamp = 0;
          this._pauseStartTime = 0;
          this._animId = 0;
          this._animRequested = false;
          this._currentLine = [];
          this._stations = {};
        },

        isRunning: function () {
          return this._state === L.Marker.MovingMarker.runState;
        },

        isEnded: function () {
          return this._state === L.Marker.MovingMarker.endedState;
        },

        isStarted: function () {
          return this._state !== L.Marker.MovingMarker.notStartedState;
        },

        isPaused: function () {
          return this._state === L.Marker.MovingMarker.pausedState;
        },

        start: function () {
          if (this.isRunning()) {
            return;
          }

          if (this.isPaused()) {
            this.resume();
          } else {
            this._loadLine(0);
            this._startAnimation();
            this.fire('start');
          }
        },

        resume: function () {
          if (!this.isPaused()) {
            return;
          }
          // update the current line
          this._currentLine[0] = this.getLatLng();
          this._currentDuration -= (this._pauseStartTime - this._startTime);
          this._startAnimation();
        },

        pause: function () {
          if (!this.isRunning()) {
            return;
          }

          this._pauseStartTime = Date.now();
          this._state = L.Marker.MovingMarker.pausedState;
          this._stopAnimation();
          this._updatePosition();
        },

        stop: function (elapsedTime) {
          if (this.isEnded()) {
            return;
          }

          this._stopAnimation();

          if (typeof (elapsedTime) === 'undefined') {
            // user call
            elapsedTime = 0;
            this._updatePosition();
          }

          this._state = L.Marker.MovingMarker.endedState;
          this.fire('end', {elapsedTime: elapsedTime});
        },

        addLatLng: function (latlng, duration) {
          this._latlngs.push(L.latLng(latlng));
          this._durations.push(duration);
        },

        moveTo: function (latlng, duration) {
          this._stopAnimation();
          this._latlngs = [this.getLatLng(), L.latLng(latlng)];
          this._durations = [duration];
          this._state = L.Marker.MovingMarker.notStartedState;
          this.start();
          this.options.loop = false;
        },

        addStation: function (pointIndex, duration) {
          if (pointIndex > this._latlngs.length - 2 || pointIndex < 1) {
            return;
          }
          this._stations[pointIndex] = duration;
        },

        onAdd: function (map) {
          L.Marker.prototype.onAdd.call(this, map);

          if (this.options.autostart && (!this.isStarted())) {
            this.start();
            return;
          }

          if (this.isRunning()) {
            this._resumeAnimation();
          }
        },

        onRemove: function (map) {
          L.Marker.prototype.onRemove.call(this, map);
          this._stopAnimation();
        },

        _createDurations: function (latlngs, duration) {
          var lastIndex = latlngs.length - 1;
          var distances = [];
          var totalDistance = 0;
          var distance = 0;

          // compute array of distances between points
          for (var i = 0; i < lastIndex; i++) {
            distance = latlngs[i + 1].distanceTo(latlngs[i]);
            distances.push(distance);
            totalDistance += distance;
          }

          var ratioDuration = duration / totalDistance;

          var durations = [];
          for (i = 0; i < distances.length; i++) {
            durations.push(distances[i] * ratioDuration);
          }

          return durations;
        },

        _startAnimation: function () {
          this._state = L.Marker.MovingMarker.runState;
          this._animId = L.Util.requestAnimFrame(function (timestamp) {
            this._startTime = Date.now();
            this._startTimeStamp = timestamp;
            this._animate(timestamp);
          }, this, true);
          this._animRequested = true;
        },

        _resumeAnimation: function () {
          if (!this._animRequested) {
            this._animRequested = true;
            this._animId = L.Util.requestAnimFrame(function (timestamp) {
              this._animate(timestamp);
            }, this, true);
          }
        },

        _stopAnimation: function () {
          if (this._animRequested) {
            L.Util.cancelAnimFrame(this._animId);
            this._animRequested = false;
          }
        },

        _updatePosition: function () {
          var elapsedTime = Date.now() - this._startTime;
          this._animate(this._startTimeStamp + elapsedTime, true);
        },

        _loadLine: function (index) {
          this._currentIndex = index;
          this._currentDuration = this._durations[index];
          this._currentLine = this._latlngs.slice(index, index + 2);
        },

        /**
         * Load the line where the marker is
         * @param  {Number} timestamp
         * @return {Number} elapsed time on the current line or null if
         * we reached the end or marker is at a station
         */
        _updateLine: function (timestamp) {
          // time elapsed since the last latlng
          var elapsedTime = timestamp - this._startTimeStamp;

          // not enough time to update the line
          if (elapsedTime <= this._currentDuration) {
            return elapsedTime;
          }

          var lineIndex = this._currentIndex;
          var lineDuration = this._currentDuration;
          var stationDuration;

          while (elapsedTime > lineDuration) {
            // substract time of the current line
            elapsedTime -= lineDuration;
            stationDuration = this._stations[lineIndex + 1];

            // test if there is a station at the end of the line
            if (stationDuration !== undefined) {
              if (elapsedTime < stationDuration) {
                this.setLatLng(this._latlngs[lineIndex + 1]);
                return null;
              }
              elapsedTime -= stationDuration;
            }

            lineIndex++;

            // test if we have reached the end of the polyline
            if (lineIndex >= this._latlngs.length - 1) {

              if (this.options.loop) {
                lineIndex = 0;
                this.fire('loop', {elapsedTime: elapsedTime});
              } else {
                // place the marker at the end, else it would be at
                // the last position
                this.setLatLng(this._latlngs[this._latlngs.length - 1]);
                this.stop(elapsedTime);
                return null;
              }
            }
            lineDuration = this._durations[lineIndex];
          }

          this._loadLine(lineIndex);
          this._startTimeStamp = timestamp - elapsedTime;
          this._startTime = Date.now() - elapsedTime;
          return elapsedTime;
        },

        _animate: function (timestamp, noRequestAnim) {
          this._animRequested = false;

          // find the next line and compute the new elapsedTime
          var elapsedTime = this._updateLine(timestamp);

          if (this.isEnded()) {
            // no need to animate
            return;
          }

          if (elapsedTime != null) {
            // compute the position
            var p = L.interpolatePosition(this._currentLine[0],
              this._currentLine[1],
              this._currentDuration,
              elapsedTime);
            this.setLatLng(p);
          }

          if (!noRequestAnim) {
            this._animId = L.Util.requestAnimFrame(this._animate, this, false);
            this._animRequested = true;
          }
        }
      });

      L.Marker.movingMarker = function (latlngs, duration, options) {
        return new L.Marker.MovingMarker(latlngs, duration, options);
      };
      // ЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖЖ
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


      // L.marker(this.center).addTo(this.map)
      //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      //   .openPopup();
      //
      // // полином добавлен отдельно
      // L.polyline([[55.8250812, 49.1924942], [55.8040812, 49.1944942], [55.8040812, 49.1924942]],
      //   {
      //     color: 'red',
      //     weight: 3,
      //     opacity: 0.5,
      //     smoothFactor: 1
      //   }).addTo(this.map);

      var parisKievLL = [[48.8567, 2.3508], [50.45, 30.523333]];
      var londonParisRomeBerlinBucarest = [[51.507222, -0.1275], [48.8567, 2.3508],
        [41.9, 12.5], [52.516667, 13.383333], [44.4166, 26.1]];
      var londonBrusselFrankfurtAmsterdamLondon = [[51.507222, -0.1275], [50.85, 4.35],
        [50.116667, 8.683333], [52.366667, 4.9], [51.507222, -0.1275]];
      var barcelonePerpignanPauBordeauxMarseilleMonaco = [
        [41.385064, 2.173403],
        [42.698611, 2.895556],
        [43.3017, -0.3686],
        [44.837912, -0.579541],
        [43.296346, 5.369889],
        [43.738418, 7.424616]
      ];


      this.map.fitBounds(londonParisRomeBerlinBucarest);

// ========================================================================
      var marker1 = L.Marker.movingMarker(parisKievLL, [10000]).addTo(this.map);
      L.polyline(parisKievLL).addTo(this.map);
      marker1.once('click', function () {
        marker1.start();
        marker1.closePopup();
        marker1.unbindPopup();
        marker1.on('click', function () {
          if (marker1.isRunning()) {
            marker1.pause();
          } else {
            marker1.start();
          }
        });
        setTimeout(function () {
          marker1.bindPopup('<b>Click me to pause !</b>').openPopup();
        }, 2000);
      });

      marker1.bindPopup('<b>Click me to start !</b>', {closeOnClick: false});
      marker1.openPopup();

// ========================================================================

      var marker2 = L.Marker.movingMarker(londonParisRomeBerlinBucarest,
        [3000, 9000, 9000, 4000], {autostart: true}).addTo(this.map);
      L.polyline(londonParisRomeBerlinBucarest, {color: 'red'}).addTo(this.map);


      marker2.on('end', function () {
        marker2.bindPopup('<b>Welcome to Bucarest !</b>', {closeOnClick: false})
          .openPopup();
      });

// =========================================================================

      var marker3 = L.Marker.movingMarker(londonBrusselFrankfurtAmsterdamLondon,
        [2000, 2000, 2000, 2000], {autostart: true, loop: true}).addTo(this.map);

      marker3.loops = 0;
      marker3.bindPopup('', {closeOnClick: false});

// =========================================================================

      var marker4 = L.Marker.movingMarker([[45.816667, 15.983333]], []).addTo(this.map);

      marker3.on('loop', function (e) {
        marker3.loops++;
        if (e.elapsedTime < 50) {
          marker3.getPopup().setContent("<b>Loop: " + marker3.loops + "</b>")
          marker3.openPopup();
          setTimeout(function () {
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

      this.map.on("click", function (e) {
        marker4.moveTo(e.latlng, 2000);
      });

// =========================================================================

      var marker5 = L.Marker.movingMarker(
        barcelonePerpignanPauBordeauxMarseilleMonaco,
        10000, {autostart: true}).addTo(this.map);

      marker5.addStation(1, 2000);
      marker5.addStation(2, 2000);
      marker5.addStation(3, 2000);
      marker5.addStation(4, 2000);

      L.polyline(barcelonePerpignanPauBordeauxMarseilleMonaco,
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
