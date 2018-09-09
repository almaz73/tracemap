/**
 * Библиотека для визуализации движения маркера на карте
 * принимает массив координат и массив отрезков времени, или только общее время
 */

import L from 'leaflet';

L.interpolatePosition = function (p1, p2, duration, t) {
  var k = t / duration;
  k = (k > 0) ? k : 0;
  k = (k > 1) ? 1 : k;
  return L.latLng(p1.lat + k * (p2.lat - p1.lat),
    p1.lng + k * (p2.lng - p1.lng));
};


let DIV = `<svg class="car" style="transform: rotate(-210deg) !important;" xmlns="http://www.w3.org/2000/svg" width="43" height="24" viewBox="0 0 43 24" fill="none">
      <rect width="16" height="35" fill="black" fill-opacity="0" />
      <g filter="url(#filter0_d)">
        <path
          d="M15.9443 2.4679C15.9064 2.65674 15.8496 2.90223 15.7929 3.12883C20.6387 3.10995 29.4218 3.07218 30.5008 3.14771C31.9773 3.26101 35.1195 3.67645 35.1195 3.67645C38.3564 4.03524 38.8864 8.26515 38.9811 9.587C38.9811 9.68142 38.9811 9.75695 39 9.8136C39 9.8136 39 9.83248 39 9.88913C39 9.94579 39 9.96467 39 9.96467C39 10.0213 39 10.0969 38.9811 10.1913C38.8864 11.5131 38.3564 15.7241 35.1195 16.1018C35.1195 16.1018 31.9773 16.5361 30.5008 16.6306C29.4408 16.7061 20.563 16.6683 15.7361 16.6494C15.8118 16.9516 15.9064 17.2915 15.9632 17.537C16.0768 18.0657 15.8496 18.0846 15.3764 17.8769C15.0925 17.7636 14.8464 17.1215 14.676 16.6306C13.4078 16.6306 12.6128 16.6117 12.6128 16.6117C12.6128 16.6117 7.88048 17.4426 6.15792 15.2898C4.43537 13.1749 4.22715 12.8539 4.17036 12.2118C4.1325 11.7397 4.05679 10.6822 4.01893 10.1346C4.01893 10.078 4.01893 10.0213 4 9.96467C4 9.96467 4 9.9269 4 9.88913C4 9.83248 4 9.8136 4 9.8136C4 9.77583 4 9.71918 4.01893 9.64365C4.05679 9.11491 4.11357 8.03855 4.17036 7.58534C4.22715 6.9433 4.4543 6.62228 6.17685 4.46956C7.89941 2.31684 12.6317 3.14771 12.6317 3.14771C12.6317 3.14771 13.4646 3.14771 14.7707 3.12883C14.9221 2.69451 15.1493 2.22242 15.3953 2.10912C15.8496 1.92028 16.0579 1.93917 15.9443 2.4679Z"
          fill="#9E9E9E"/>
      </g>
      <path
        d="M13.8619 15.7052C13.0291 15.8374 13.0669 15.7052 13.0669 15.7052C10.8333 13.7414 10.909 9.908 10.909 9.908C10.909 9.908 10.8333 6.05576 13.0669 4.11076C13.0669 4.11076 13.0291 3.97857 13.8619 4.11076C14.6948 4.24294 17.8371 4.67726 17.8371 4.67726C17.8371 4.67726 17.1178 6.18795 17.0988 9.908C17.1367 13.6281 17.8371 15.1387 17.8371 15.1387C17.8371 15.1387 14.6948 15.5542 13.8619 15.7052ZM30.1032 9.98354C30.0085 13.1371 29.2703 14.7233 29.2703 14.7233L34.2297 14.9499C35.3465 13.3637 35.5547 10.6822 35.5926 10.0591C35.5926 10.0591 35.5926 10.0402 35.5926 9.98354C35.5926 9.94577 35.5926 9.908 35.5926 9.908C35.5547 9.28485 35.3465 6.60338 34.2297 5.01717L29.2703 5.24377C29.2703 5.24377 30.0085 6.82999 30.1032 9.98354ZM34.1161 15.422C34.1161 15.422 26.0712 14.3645 13.4266 16.234C13.4266 16.234 29.8571 16.7627 34.1161 15.422ZM13.4266 3.61978C26.0712 5.47037 34.1161 4.43178 34.1161 4.43178C29.8571 3.07216 13.4266 3.61978 13.4266 3.61978Z"
        fill="black"/>
      <defs>
        <filter id="filter0_d" x="0" y="3.05176e-05" width="43" height="24" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>`;

function setDegree(deg) {
  let obj = document.getElementsByClassName('car')[0];
  if (obj && obj.style) {
    obj.style.transform = "rotate(" + deg + "deg)";
  }

  // console.log("...... this=", this)

  if (!L.isSaid) { // костыль, чтобы отобразился автомобиль
    L.isSaid = true;
    console.log("...... deg=", deg)
  }
}

const icon = L.divIcon({
  className: "my-car",
  iconAnchor: [0, 0],
  html: DIV
});


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
    loop: false,
    icon: icon
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
    // обновляем текущую линию
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

    // вычислять массив расстояний между точками
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

  getCounter: function () {
    return this.counter
  },

  /**
   * Загрузите линию, в которой находится маркер
   * @param {Number} timestamp
   * @return {Number} прошедшее время в текущей строке или null, если
   * мы достигли конца или маркер на станции
   */
  _updateLine: function (timestamp) {
    // время, прошедшее со времени последнего latlng
    var elapsedTime = timestamp - this._startTimeStamp;

    // недостаточно времени для обновления строки
    if (elapsedTime <= this._currentDuration) {
      return elapsedTime;
    }

    var lineIndex = this._currentIndex;
    var lineDuration = this._currentDuration;
    var stationDuration;

    while (elapsedTime > lineDuration) {
      // вычитаем время текущей линии
      elapsedTime -= lineDuration;
      stationDuration = this._stations[lineIndex + 1];

      // проверяем, есть ли станция в конце строки
      if (stationDuration !== undefined) {
        if (elapsedTime < stationDuration) {
          this.setLatLng(this._latlngs[lineIndex + 1]);
          return null;
        }
        elapsedTime -= stationDuration;
      }

      lineIndex++;

      // проверяем, достигли ли мы конца полилинии
      if (lineIndex >= this._latlngs.length - 1) {
        if (this.options.loop) {
          lineIndex = 0;
          this.fire('loop', {elapsedTime: elapsedTime});
        } else {
          // поместите маркер в конец, иначе он будет в последней позиции
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

    // находим следующую линию и вычисляем новый elapsedTime
    var elapsedTime = this._updateLine(timestamp);

    if (this.isEnded()) {
      // нет необходимости анимировать
      return;
    }

    if (elapsedTime != null) {
      // вычислять позицию
      var p = L.interpolatePosition(this._currentLine[0],
        this._currentLine[1],
        this._currentDuration,
        elapsedTime);
      if (this.p_old) {
        // повороты машинки
        setDegree(-Math.atan2(this.p_old.lat - p.lat, this.p_old.lng - p.lng) * 180 / Math.PI);
      }
      this.p_old = p;

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

export default this;
