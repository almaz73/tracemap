<template>
  <div>
    <div class="triggerShowButton" @click="switchPopups()"></div>
    <div class="triggerShowButton online" @click="triggerOnline()"></div>
    <div class="integration" v-if="statusBar">
      <router-link to="/password">Autorization:</router-link>
      <span style="color: green" v-if="isSocket">Websocket : connected</span>
      <span v-else>Websocket DISCONNECTED</span>
      <span
        v-if="isVisibleOnlineBrigades"
        :style="{color: statusBrigadeCoordinates===200? 'green':'red'}"
      >| Brigade coordinates: upd {{timer}}sec.</span>
    </div>
    <Legend :labels="legendItems"/>
  </div>
</template>

<script>
  import application from '../assets/js/application'
  import * as stomp from '../assets/js/stomp'
  import L from 'leaflet';
  import * as axios from 'axios';
  import Legend from "../components/Legend";

  const colorByCallSignId = {
    2: {img: 'sp', text: 'Скорая помощь'},
    3: {img: 'np', text: 'Неотложный вызов'},
    5: {img: 'pp', text: 'Перевозка плановая'},
    6: {img: 'pe', text: 'Перевозка плановая экстренная'},
    7: {img: 'spc', text: 'СПЦ'}
  };

  const brigadeImgConsts = {
    '1': {img: 'free', text: 'Свободна'},
    '2': {img: 'comeToStation', text: 'Возврат на подстанцию'},
    '3': {img: 'atStation', text: 'На подстанции'},
    '4': {img: 'fueling', text: 'Бензин'},
    '5': {img: 'medicalFueling', text: 'Медикаменты'},
    '6': {img: 'carHandling', text: 'Передача вызова'},
    '7': {img: 'lunch', text: 'Обед'},
    '8': {img: 'onCall', text: 'На вызове'},
    '9': {img: 'goFromStation', text: 'Выезд с подстанции'},
    '10': {img: 'nearCallPlace', text: 'Доезд к месту вызова'},
    '11': {img: 'hospitalization', text: 'Госпитализация'},
    '12': {img: 'nearLPU', text: 'Доезд к ЛПУ'},
    '13': {img: 'receivePatient', text: 'Доставлен в ЛПУ'},
    '14': {img: 'dispatcherClosing', text: 'Снята диспетчером'},
    '15': {img: 'repairs', text: 'Ремонт'},
    '16': {img: 'dispatcherClosing', text: 'На обед'},
    '17': {img: 'dispatcherClosing', text: 'Пересменка'},
    '18': {img: 'dispatcherClosing', text: 'Замена машины'}
  };

  const callMarkersMap = [];
  let brigadeMarkersMap = {};
  let brigadeQueue = [];
  let functions = {};

  export default {
    name: "Integration",
    components: {Legend},
    data() {
      return {
        isSocket: true,
        statusBrigadeCoordinates: 0,
        isVisiblePopups: false,
        timer: 0,
        isVisibleOnlineBrigades: true
      }
    },
    computed: {
      statusBar: function () {
        return location.host.indexOf('localhost') > -1
      },
      legendItems: function () {
        let arr = [];
        Object.keys(brigadeImgConsts).map(el => arr.push(brigadeImgConsts[el]));
        return arr;
      }
    },
    methods: {
      isSocketConnected: function (open, error) {
        this.isSocket = open;
        if (this.isSocket) {
          stomp.setStompClient("/user/topic/mapcall/current", this.addedNewCalls);
          stomp.setStompClient("/user/topic/brigade/current", this.addedNewrigades);
        } else {
          console.log("Websocket error: ", error)
        }
      },
      addedNewCalls(tick) {
        let entity = JSON.parse(tick.body);

        if (entity instanceof Array) {
          entity.map(el => this.addCall(el));

          let call = localStorage.getItem('focusOnCall');
          this.focusOnCall(call);
        } else {
          if (entity.changeType === 'SAVED') {
            if (!callMarkersMap[entity.payload.id]) {
              this.addCall(entity.payload);
            } else {
              this.changeCall(entity.payload);
            }
          } else {
            if (callMarkersMap[entity.payload.id]) {
              this.removeCall(entity.payload);
            }
          }
        }
      },
      removeCall(call) {
        callMarkersMap[call.id].remove();
        delete callMarkersMap[call.id];
      },
      changeCall(call) {
        this.removeCall(call);
        this.addCall(call);
      },
      focusOnCall: function (e) {
        let call = JSON.parse((e && e.newValue) || e);
        if (call === null) return;

        if (call.latitude && call.longitude) application.map.setView([call.latitude, call.longitude], 17);
        else console.log("Не удалось определить место вызова"); // todo компонент показа сообщений требуется

        localStorage.setItem('focusOnCall', null);
      },
      addedNewrigades(tick) {
        let brigades = JSON.parse(tick.body);

        // может прийти массив или одна бригада
        if (brigades.length > 1) {
          brigadeQueue = brigades;
          // при первом запуске надо проверить содержимое storage
          let brigade = localStorage.getItem('focusOnBrigade');
          this.focusOnBrigade(brigade);
          if (this.isVisibleOnlineBrigades) this.getNewBrigadeCoordinates();
        } else {
          this.handleNewBrigade(brigades[0]);
        }
      },
      handleNewBrigade(entity) {
        if (!entity) return;
        let searchBrigadeIndex = -1;
        let brigade = entity.payload;

        brigadeQueue.find(function (brigadeInQueue, index) {
          if (brigadeInQueue.id === brigade.id) {
            searchBrigadeIndex = index;
            return true;
          } else {
            return false;
          }
        });

        if (entity.changeType === 'SAVED') {
          if (~searchBrigadeIndex) {
            brigadeQueue[searchBrigadeIndex] = brigade;
          } else {
            brigadeQueue.push(brigade);
          }
        } else if (~searchBrigadeIndex) {
          brigadeQueue.splice(searchBrigadeIndex, 1);
        }
      },
      focusOnBrigade(e) {
        const brigadeQueueToFocus = JSON.parse((e && e.newValue) || e);
        if (brigadeQueueToFocus === null) return;


        // markersDeferred.promise.then(() => {
        // находим бригаду по совпадению номера автомобиля
        // const brigadeMarker = brigadeMarkersMap[brigadeQueueToFocus.brigadeId]; // <= надо будет подождать пока данные придут

        // if (brigadeMarker) application.map.setView(brigadeMarker._latlng, 17);
        // else console.log('Не удалось определить местонахождение бригады ' + brigadeQueueToFocus.brigade); // todo

        localStorage.setItem('focusOnBrigade', null);
        // });

      },
      addCall(call) {
        if (call.latitude && call.longitude) {

          let marker = L.marker([call.latitude, call.longitude]).addTo(this.layerOnlineBrigade);
          let iconName = (colorByCallSignId[call.callSignCode] || colorByCallSignId[2]).img + '.png';
          let iconPath = (call.assigned ? 'assigned/' : '') + iconName;

          let icon = L.icon({
            iconUrl: require('../assets/images/ambulance/' + iconPath),
            iconSize: [25, 25],
            iconAnchor: [12, 25],
            popupAnchor: [1, 30],
            tooltipAnchor: [16, -28],
            shadowSize: [25, 25]
          });

          marker.setIcon(icon);
          marker.bindPopup(L.popup({
            closeOnClick: false,
            autoClose: false,
            closeButton: false,
            autoPan: false,
            className: 'own-popup'
          }).setContent('<p style="text-align: center">' + (call.callNumber || call.callNumber112) + (call.brigadeName ? ' ' + call.brigadeName : '') + '</p>'));

          if (this.isVisiblePopups) {
            marker.openPopup();
          }

          callMarkersMap[call.id] = marker;
        } else {
          callMarkersMap[call.id] = call;
        }
      },
      addWfstMarker(marker) {
        let oldMarker;

        let iconName = (brigadeImgConsts[marker.code] || brigadeImgConsts['14']).img + '.png';

        let icon = L.icon({
          iconUrl: require('../assets/images/ambulance/brigadeStatus/' + iconName),
          iconSize: [25, 25],
          iconAnchor: [12, 25],
          popupAnchor: [1, 22],
          tooltipAnchor: [16, -28],
          shadowSize: [25, 25],
          className: 'car-marker'
        });

        let controlTime = marker.controlTime ? new Date(marker.controlTime) : null;
        let hours = controlTime ? ('00' + controlTime.getHours()).slice(-2) : null;
        let minutes = controlTime ? ('00' + controlTime.getMinutes()).slice(-2) : null;

        if (brigadeMarkersMap[marker.id]) {

          oldMarker = brigadeMarkersMap[marker.id];

          if (oldMarker.code !== marker.code) {
            oldMarker.setIcon(icon);
          }

          // тестовая анимация
          // marker.latitude += Math.random() / 100;
          // marker.longitude += Math.random() / 100;

          if (oldMarker.getLatLng().lat !== marker.latitude || oldMarker.getLatLng().lng !== marker.longitude) {
            oldMarker.setLatLng([marker.latitude, marker.longitude]); // новое местоположение
          }

          oldMarker.getPopup().setContent(marker.brigadeName + (controlTime ? ' ' + hours + ':' + minutes : ''));
        } else {
          let myMarker = L.marker([marker.latitude, marker.longitude], {icon: icon}).addTo(this.layerOnlineBrigade);

          oldMarker = myMarker;
          oldMarker.code = marker.code;
          oldMarker.brigadeName = marker.brigadeName;

          myMarker.bindPopup(L.popup({
            closeOnClick: false,
            autoClose: false,
            closeButton: false,
            autoPan: false,
            className: 'own-popup car-marker'
          }).setContent(marker.brigadeName + (controlTime ? ' ' + hours + ':' + minutes : '')));

          if (this.isVisiblePopups) {
            oldMarker.openPopup();
          }

          brigadeMarkersMap[marker.id] = oldMarker;
        }
      },
      switchPopups() {
        this.isVisiblePopups = !this.isVisiblePopups;
        for (let callId in callMarkersMap) {
          let call = callMarkersMap[callId];

          call.openPopup && call[this.isVisiblePopups ? 'openPopup' : 'closePopup']();
        }

        for (let brigadeId in brigadeMarkersMap) {
          let brigade = brigadeMarkersMap[brigadeId];

          brigade.openPopup && brigade[this.isVisiblePopups ? 'openPopup' : 'closePopup']();
        }
      },
      triggerOnline() {
        // скрытие и показ бригад
        if (this.isVisibleOnlineBrigades) {
          this.tmpLayers = this.layerOnlineBrigade.getLayers();
          this.layerOnlineBrigade.clearLayers();
          this.isVisiblePopups = false;
        } else {
          this.tmpLayers && this.tmpLayers.map(el => this.layerOnlineBrigade.addLayer(el));
          this.getNewBrigadeCoordinates();
        }
        this.isVisibleOnlineBrigades = !this.isVisibleOnlineBrigades;
      },
      smootHRunningMarkers(bool) {
        // плавное движение маркеров
        let carMakers = document.querySelectorAll('.car-marker');
        for (var i = 0; carMakers.length > i; i++) {
          carMakers[i].style.transition = bool ? '.5s linear' : '';
        }
      },
      async getParams() {
        const req = await axios.get('/ambulance/dictionaries/parameterValues');

        let tileUrl = req.data[46] + '/{z}/{x}/{y}.png';
        if (!tileUrl.startsWith('http')) {
          tileUrl = 'http://' + window.location.hostname + tileUrl;
        }
        let tile = L.tileLayer(tileUrl, {});
        this.$emit('setTile', tile);
      },
      async getObservationCoordinates() {
        const req = await axios.get('/ambulance/places/location/current/coordinates');
        application.map.setView([req.data.latitude, req.data.longitude], 12);
      },
      async getNewBrigadeCoordinates() {
        const response = await axios.get('/ambulance/telematics/brigades', {validateStatus: status => this.statusBrigadeCoordinates = status});
        if (response.status === 200) {
          response.data.map(brigadeGeodata => {
            let brigadeId = brigadeGeodata.brigadeId;
            if (brigadeId) {
              let brigade = brigadeQueue.find(function (brigade) {
                return brigade.brigadeId === brigadeId;
              });
              if (brigade) {
                brigadeGeodata.code = brigade.statusCode;
                brigadeGeodata.controlTime = brigade.controlTime;

                this.addWfstMarker(brigadeGeodata);
              } else {
                // Удаляем старую бригаду, если она была
                const oldMarker = brigadeMarkersMap[brigadeId];
                if (oldMarker) {
                  application.map.removeLayer(oldMarker);
                  delete brigadeMarkersMap[brigadeId];
                }
              }
              this.smootHRunningMarkers(true);
            }
          });
        }
        this.timer = (this.statusBrigadeCoordinates !== 200 || document.hidden) ? 20 : 5;

        if (this.isVisibleOnlineBrigades) setTimeout(() => this.getNewBrigadeCoordinates(), this.timer * 1000);
        else this.timer = null;
      }
    },
    created() {
      stomp.connect(this.isSocketConnected);
    },
    mounted() {
      this.getObservationCoordinates();
      this.getParams();
      localStorage.setItem('mapIsOpen', true); // сохраняем состояние окна как открытое

      window.addEventListener('storage', function (e) {
        if (functions[e.key]) functions[e.key](e);
      });
      window.addEventListener('beforeunload', function (e) {
        localStorage.setItem('mapIsOpen', false);
      }, false);

      this.layerOnlineBrigade = L.layerGroup().addTo(application.map);

      application.map.on('zoomstart', () => this.smootHRunningMarkers(false));
      application.map.on('zoomend', () => this.smootHRunningMarkers(true));
    },
    beforeDestroy() {
      localStorage.removeItem('mapIsOpen');
      stomp.disconnect();
    }

  }
</script>

<style>
  .integration {
    position: absolute;
    bottom: 0;
    padding: 10px;
    z-index: 100;
    line-height: 0px;
    right: 0;
    left: 0;
    background: blanchedalmond;
    opacity: 0.7;
    font-size: small;
    color: red;
  }

  .triggerShowButton {
    position: absolute;
    height: 24px;
    width: 4px;
    z-index: 100;
    left: 387px;
    top: 20px;
    background: #FFFFFF;
    border-radius: 3px;
    padding: 20px 10px;
    border: none;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    cursor: pointer;
  }

  .triggerShowButton.online {
    left: 417px;
  }

</style>
