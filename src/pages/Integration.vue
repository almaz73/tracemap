<template>
  <div>
    <div class="triggerShowButton online trig-auto" @click="triggerOnline()"
         :style="{'opacity':isVisibleOnlineBrigades?1:0.5}"
    ></div>
    <div class="triggerShowButton trig-tooltip" @click="switchPopups()"
         :style="{'opacity':isVisiblePopups?1:0.5, 'display':isVisibleOnlineBrigades?'block':'none'}"></div>
    <div class="integration" v-if="statusBar">
      <router-link to="/password">Authorization:</router-link>
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
          stomp.setStompClient("/user/topic/brigade/current", this.addedNewBrigades);
        } else {
          console.log("Websocket error: ", error)

          // через десять секунд пробуем заново подключиться
          // if (error.type === 'close') setTimeout(() => stomp.connect(this.isSocketConnected), 10000);
        }
      },
      addedNewCalls(tick) {
        let call = localStorage.getItem('focusOnCall');
        if (call !== 'null') this.focusOnCall(call);

        let entity = JSON.parse(tick.body);

        if (entity instanceof Array) {
          for (let callId in callMarkersMap) {
            this.removeCall(callId);
          }
          entity.map(el => {
            this.addCall(el);
          });
        } else {
          this.removeCall(entity.payload.id);
          if (entity.changeType === 'SAVED') {
            this.addCall(entity.payload);
          }
        }
      },
      removeCall(callId) {
        let oldMarker = callMarkersMap[callId];
        if (oldMarker) {
          oldMarker.removeFrom(this.layerOnlineBrigade);
          delete callMarkersMap[callId];
        }
      },
      changeCall(call) {
      },
      removeBrigade(ordersId) {
        // Удаляем старую бригаду, если она была
        const oldMarker = brigadeMarkersMap[ordersId];
        if (oldMarker) {
          oldMarker.removeFrom(this.layerOnlineBrigade);
          delete brigadeMarkersMap[ordersId];
        }
      },
      focusOnCall: function (e) {
        let call = JSON.parse((e && e.newValue) || e);
        if (call === null) return;

        if (call.latitude && call.longitude) application.map.setView([call.latitude, call.longitude], 17);
        else console.log("Не удалось определить место вызова"); // todo компонент показа сообщений требуется

        localStorage.setItem('focusOnCall', null);
      },
      addedNewBrigades(tick) {
        let brigades = JSON.parse(tick.body);

        let brigade = localStorage.getItem('focusOnBrigade');
        if (brigade !== 'null') this.focusOnBrigade(brigade);

        // может прийти массив или одна бригада
        if (Array.isArray(brigades)) {
          brigadeQueue = brigades;
          if (this.isVisibleOnlineBrigades) this.getNewBrigadeCoordinates();
        } else {
          this.handleBrigadeChange(brigades);
        }

        this.setCheckboxBrigades(); // при каждом обновлении, обновляем данные в сторе о состояние комбобокса бригад
      },
      setCheckboxBrigades() {
        this.$store.getters.brigades.forEach(el => typeof el === 'number' && this.$store.dispatch('setBrigade', el)); // стерем
        brigadeQueue.forEach(el => {
          if (el.automobileId) this.$store.dispatch('setBrigade', el.automobileId) // добавим
        });
        application.brigadeQueue = brigadeQueue;
        application.callMarkersMap = callMarkersMap;
        application.brigadeMarkersMap = brigadeMarkersMap;
      },

      handleBrigadeChange(entity) {
        let searchBrigadeIndex = -1;
        let changedBrigadeQueue = entity.payload;

        brigadeQueue.find(function (brigadeInQueue, index) {
          if (brigadeInQueue.id === changedBrigadeQueue.id) {
            searchBrigadeIndex = index;
            return true;
          } else {
            return false;
          }
        });

        if (entity.changeType === 'SAVED') {
          if (searchBrigadeIndex !== -1) {
            brigadeQueue[searchBrigadeIndex] = changedBrigadeQueue;
          } else {
            brigadeQueue.push(changedBrigadeQueue);
          }
        } else if (searchBrigadeIndex !== -1) {
          brigadeQueue.splice(searchBrigadeIndex, 1);
        }
      },
      focusOnBrigade(e) {
        const brigadeQueueToFocus = JSON.parse((e && e.newValue) || e);
        if (brigadeQueueToFocus === null) return;

        if (Object.keys(brigadeMarkersMap).length) {
          let brigadeMarker = brigadeMarkersMap[brigadeQueueToFocus.orderId];
          if (brigadeMarker) application.map.setView(brigadeMarker._latlng, 17);
          else console.log('Не удалось определить местонахождение бригады ' + brigadeQueueToFocus.brigade);
          localStorage.setItem('focusOnBrigade', null);
        }
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
            popupAnchor: [0, 50],
            tooltipAnchor: [12, -20],
            shadowSize: [25, 25]
          });

          marker.setIcon(icon);
          marker.bindPopup(call.callNumber + (call.brigadeName ? '<br/>' + call.brigadeName : ''), {
            closeOnClick: false,
            autoClose: false,
            closeButton: false,
            autoPan: false,
            className: 'own-popup'
          });

          if (this.isVisiblePopups) {
            marker.openPopup();
          }

          callMarkersMap[call.id] = marker;
        }
      },
      addChangeBrigadeMarker(brigadeGeodata) {
        let iconName = (brigadeImgConsts[brigadeGeodata.code] || brigadeImgConsts['14']).img + '.png';

        let icon = L.icon({
          iconUrl: require('../assets/images/ambulance/brigadeStatus/' + iconName),
          iconSize: [25, 25],
          iconAnchor: [12, 25],
          popupAnchor: [0, 38],
          tooltipAnchor: [12, -20],
          // shadowSize: [40, 40],
          className: 'car-marker'
        });

        let controlTime = brigadeGeodata.controlTime ? new Date(brigadeGeodata.controlTime) : null;
        let hours = controlTime ? ('00' + controlTime.getHours()).slice(-2) : null;
        let minutes = controlTime ? ('00' + controlTime.getMinutes()).slice(-2) : null;

        let controlTimeExceeded = controlTime && controlTime < new Date();

        let marker = brigadeMarkersMap[brigadeGeodata.ordersId];

        if (!marker) {
          // Создаем новый
          marker = L.marker([brigadeGeodata.latitude, brigadeGeodata.longitude], {icon: icon}).addTo(this.layerOnlineBrigade);

          marker.bindPopup(L.popup({
            closeOnClick: false,
            autoClose: false,
            closeButton: false,
            autoPan: false,
            className: 'own-popup car-marker'
          }));

          if (this.isVisiblePopups) {
            marker.openPopup();
          }

          brigadeMarkersMap[brigadeGeodata.ordersId] = marker;
        } else {
          if (marker.code !== brigadeGeodata.code) {
            marker.setIcon(icon);
          }

          if (marker.getLatLng().lat !== brigadeGeodata.latitude || marker.getLatLng().lng !== brigadeGeodata.longitude) {
            marker.setLatLng([brigadeGeodata.latitude, brigadeGeodata.longitude]); // новое местоположение
          }
        }

        marker.code = brigadeGeodata.code;
        marker.getPopup().setContent(controlTimeExceeded ? '<span style="color:red">' + brigadeGeodata.brigade + '</span>' : brigadeGeodata.brigade);
        let tooltipText = brigadeGeodata.statusName;
        if (controlTime) {
          let time = hours + ':' + minutes;
          if (controlTimeExceeded) {
            time = '<span style="color:red">' + time + '</span>'
          }
          tooltipText += '<br/>Контрольное время ' + time;
        }
        if (tooltipText) {
          marker.bindTooltip(tooltipText)
        } else {
          marker.unbindTooltip();
        }
      },
      switchPopups() {
        this.isVisiblePopups = !this.isVisiblePopups;
        for (let callId in callMarkersMap) {
          let call = callMarkersMap[callId];

          call.openPopup && call[this.isVisiblePopups ? 'openPopup' : 'closePopup']();
        }

        for (let ordersId in brigadeMarkersMap) {
          let brigade = brigadeMarkersMap[ordersId];

          brigade.openPopup && brigade[this.isVisiblePopups ? 'openPopup' : 'closePopup']();
        }
      },
      triggerOnline() {
        // скрытие и показ бригад
        if (this.isVisibleOnlineBrigades) {
          this.layerOnlineBrigade.removeFrom(application.map);
          this.isVisiblePopups = false;
        } else {
          this.layerOnlineBrigade.addTo(application.map);
        }
        this.isVisibleOnlineBrigades = !this.isVisibleOnlineBrigades;
      },
      smootHRunningMarkers(bool) {
        // пока отключено
        // плавное движение маркеров
        // let carMakers = document.querySelectorAll('.car-marker');
        // for (var i = 0; carMakers.length > i; i++) {
        //   carMakers[i].style.transition = bool ? '4.75s linear' : '';
        // }
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
            let ordersId = brigadeGeodata.ordersId;
            if (ordersId) {
              let brigade = brigadeQueue.find(function (bq) {
                return bq.orderId === ordersId;
              });
              if (brigade) {
                brigadeGeodata.code = brigade.statusCode;
                brigadeGeodata.brigade = brigade.brigade;
                brigadeGeodata.statusName = brigade.statusName;
                brigadeGeodata.controlTime = brigade.controlTime;

                this.addChangeBrigadeMarker(brigadeGeodata);
              } else {
                this.removeBrigade(ordersId);
              }

              this.smootHRunningMarkers(true);
            }
          });

          for (let ordersId in brigadeMarkersMap) {
            let brigade = brigadeQueue.find(function (bq) {
              return parseInt(bq.orderId) === parseInt(ordersId); // тут строка сравнивается с числом
            });
            if (!brigade) {
              this.removeBrigade(ordersId);
            }
          }
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

      window.addEventListener('beforeunload', function (e) {
        localStorage.setItem('mapIsOpen', false);
      }, false);

      this.layerOnlineBrigade = L.layerGroup().addTo(application.map);

      application.map.on('zoomstart', () => this.smootHRunningMarkers(false));
      application.map.on('zoomend', () => this.smootHRunningMarkers(true));

      // слушаем изменения локалстораж и показываем бригаду или вызов
      window.addEventListener('storage', () => {
        let brigade = localStorage.getItem('focusOnBrigade');
        let call = localStorage.getItem('focusOnCall');
        if (brigade !== 'null') {
          this.focusOnBrigade(brigade);
          localStorage.setItem('focusOnBrigade', null);
        }
        if (call !== 'null') {
          this.focusOnCall(call);
          localStorage.setItem('focusOnCall', null);
        }
      });
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
    width: 30px;
    z-index: 100;
    left: 378px;
    top: 20px;
    background: #FFFFFF;
    border-radius: 3px;
    padding: 20px 7px;
    border: none;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    cursor: pointer;
  }

  .triggerShowButton.online {
    left: 343px;
  }

  .triggerShowButton.trig-auto {
    background: url('../assets/edit/car_gray.png') no-repeat;
    background-position-y: 50%;
  }

  .triggerShowButton.trig-tooltip {
    background: url('../assets/edit/tooltip.png') no-repeat;
    background-position-y: 50%;
    background-position-x: 50%;
  }
</style>
