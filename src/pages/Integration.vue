<template>
  <div>
    <div class="triggerShowButton trig-call" @click="hideCalls()"
         :style="{'opacity':isVisibleOnlineCalls?1:0.5}"
    ></div>
    <div class="triggerShowButton trig-auto" @click="hideBrigades()"
         :style="{'opacity':isVisibleOnlineBrigades?1:0.5}"
    ></div>
    <div class="triggerShowButton trig-tooltip" @click="showMarkers(!isVisiblePopups)"
         :style="{'opacity':isVisiblePopups?1:0.5, 'display':isVisibleOnlineBrigades||isVisibleOnlineCalls?'block':'none'}"></div>
    <div class="integration" v-if="statusBar">
      <router-link to="/password">Authorization:</router-link>
      <span style="color: green" v-if="isSocket">Websocket : connected</span>
      <span v-else>Websocket DISCONNECTED</span>
      <span
        v-if="isVisibleOnlineBrigades"
        :style="{color: statusBrigadeCoordinates===200? 'green':'red'}"
      >| Brigade coordinates: upd {{timer}}sec.</span>
    </div>
    <Legend :labels="legendItems" :labelsAssigned="labelsAssigned"/>
    <SelectedBrigade/>
    <SelectedCall/>
    <Section/>
  </div>
</template>

<script>
  import application from '../assets/js/application'
  import * as stomp from '../assets/js/stomp'
  import L from 'leaflet';
  import * as axios from 'axios';
  import Legend from "../components/Legend";
  import SelectedCall from '../components/SelectedCall.vue'; // для показа данных выбранного вызова
  import SelectedBrigade from '../components/SelectedBrigade.vue'; // для открытия панели выбранной бригады
  import Section from '../components/Section.vue';

  const callMarkersMap = [];
  let brigadeMarkersMap = {};
  let brigadeQueue = [];

  export default {
    name: "Integration",
    components: {Legend, SelectedBrigade, SelectedCall, Section},
    data() {
      return {
        isSocket: true,
        statusBrigadeCoordinates: 0,
        isVisiblePopups: true, // видимость тултипов к маркерам
        timer: 0,
        isVisibleOnlineBrigades: true,
        isVisibleOnlineCalls: true,
        modeFullShow: true, // если false - показ по фильтру, в слоях только выбранные вызовы и бригады
        layerOnlineCall: null, // слой вызовов
        layerOnlineBrigade: null // слой бригад
      }
    },
    computed: {
      statusBar: function () {
        return location.host.indexOf('localhost') > -1
      },
      legendItems: function () {
        let arr = [];
        Object.keys(application.brigadeImgConsts).map(el => arr.push(application.brigadeImgConsts[el]));
        return arr;
      },
      labelsAssigned: function () {
        let arr = [];
        Object.keys(application.colorByCallSignId).map(el => arr.push(application.colorByCallSignId[el]));
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
          console.error("Websocket error: ", error)
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
          oldMarker.removeFrom(this.layerOnlineCall);
          delete callMarkersMap[callId];
        }
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

          let marker = L.marker([call.latitude, call.longitude]);

          if (this.modeFullShow) marker.addTo(this.layerOnlineCall); // если выборочный показ, не добавляем в слой

          let iconName = (application.colorByCallSignId[call.callSignCode] || application.colorByCallSignId[2]).img + '.png';
          let iconPath = (call.assigned ? 'assigned/' : '') + iconName;

          let icon = L.icon({
            iconUrl: require('../assets/images/ambulance/' + iconPath),
            iconSize: [25, 25],
            iconAnchor: [12, 25],
            popupAnchor: [0, 50],
            tooltipAnchor: [12, -20],
            shadowSize: [25, 25],
            img: iconName.slice(0, -4)
          });

          marker.setIcon(icon);
          marker.bindPopup(call.callNumber + (call.brigadeName ? '<br/>' + call.brigadeName : ''), {
            closeOnClick: false,
            autoClose: false,
            closeButton: false,
            autoPan: false,
            className: 'own-popup'
          });

          marker.on('mouseover mousedown', e => this.$root.$emit('SELECTED_CALL', call, e.type));
          marker.on('mouseout', () => this.$root.$emit('UN_SELECTED_CALL'));

          if (this.isVisiblePopups) {
            marker.openPopup();
          }

          callMarkersMap[call.id] = marker;
        }
      },

      /**
       * Управлением отображением вызовов и бригад
       * убирает все маркеры и заново расставляет выбранные вызовы и бригады
       * входные данные {callIds, brigadesOrdersIds} в виде массивов id {number}
       * если obj==null покаызваем все, иначе по фильтру
       * eсли bounds == true карту масштабируем, чтобы были видны все маркеры вместе
       */
      managerLayers(obj, bounds) {
        this.modeFullShow = !obj;

        let boundsLatLng = {minLat: Infinity, minLng: Infinity, maxLat: -Infinity, maxLng: -Infinity}; // 4 крайних координатов у маркеров

        function getBounds(marker) {
          if (boundsLatLng.maxLat < marker.getLatLng().lat) boundsLatLng.maxLat = marker.getLatLng().lat;
          if (boundsLatLng.minLat > marker.getLatLng().lat) boundsLatLng.minLat = marker.getLatLng().lat;
          if (boundsLatLng.maxLng < marker.getLatLng().lng) boundsLatLng.maxLng = marker.getLatLng().lng;
          if (boundsLatLng.minLng > marker.getLatLng().lng) boundsLatLng.minLng = marker.getLatLng().lng;
        }

        if (obj && obj.brigadesOrdersIds && obj.brigadesOrdersIds.length && !this.isVisibleOnlineBrigades) this.hideBrigades();
        if (obj && obj.callIds && obj.callIds.length && !this.isVisibleOnlineCalls) this.hideCalls();

        if (!obj || (obj && !obj.noClean)) this.cleanUpLayers(); // не убрать что было с экрана если есть noClean

        if (!obj) {
          callMarkersMap.map(marker => {
            marker.addTo(this.layerOnlineCall);
            if (bounds) getBounds(marker);
          });
          Object.keys(brigadeMarkersMap).map(id => {
            let marker = brigadeMarkersMap[id];
            marker.addTo(this.layerOnlineBrigade);
            if (bounds) getBounds(marker);
          });
          this.showMarkers(this.isVisiblePopups);
        } else {
          if (obj.callIds && obj.callIds.length) this.isVisibleOnlineCalls = true;

          for (let id in callMarkersMap) {
            if (obj.callIds && obj.callIds.includes(+id)) {
              callMarkersMap[id].addTo(this.layerOnlineCall);// все выбранные вызовы
              if (bounds) getBounds(callMarkersMap[id]);
            }
          }

          Object.keys(brigadeMarkersMap).map(id => {
            if (obj.brigadesOrdersIds.includes(+id)) {
              brigadeMarkersMap[id].addTo(this.layerOnlineBrigade);// бригады
              if (bounds) getBounds(brigadeMarkersMap[id]);
            }
          });
        }
        if (bounds) {
          // расширяем границы для отображения всех маркеров
          application.map.fitBounds([[boundsLatLng.maxLat, boundsLatLng.maxLng], [boundsLatLng.minLat, boundsLatLng.minLng]]);
        }
      },
      cleanUpLayers() {
        callMarkersMap.map(marker => marker.remove(this.layerOnlineCall));
        Object.keys(brigadeMarkersMap).map(id => brigadeMarkersMap[id].remove(this.layerOnlineBrigade));
      },
      addChangeBrigadeMarker(brigadeGeodata) {
        let iconName = (application.brigadeImgConsts[brigadeGeodata.code] || application.brigadeImgConsts['14']).img + '.png';

        let icon = L.icon({
          iconUrl: require('../assets/images/ambulance/brigadeStatus/' + iconName),
          iconSize: [25, 25],
          iconAnchor: [12, 25],
          popupAnchor: [0, 38],
          tooltipAnchor: [12, -20],
          // shadowSize: [40, 40],
          className: 'car-marker',
          img: iconName.slice(0, -4)
        });

        let controlTime = brigadeGeodata.controlTime ? new Date(brigadeGeodata.controlTime) : null;
        let hours = controlTime ? ('00' + controlTime.getHours()).slice(-2) : null;
        let minutes = controlTime ? ('00' + controlTime.getMinutes()).slice(-2) : null;

        let controlTimeExceeded = controlTime && controlTime < new Date();

        let marker = brigadeMarkersMap[brigadeGeodata.ordersId];

        if (!marker) {
          // Создаем новый
          marker = L.marker([brigadeGeodata.latitude, brigadeGeodata.longitude], {icon: icon});

          if (this.modeFullShow) marker.addTo(this.layerOnlineBrigade); // если выборочный показ не добавляем в слой

          marker.bindPopup(L.popup({
            closeOnClick: false,
            autoClose: false,
            closeButton: false,
            autoPan: false,
            className: 'own-popup car-marker'
          }));

          marker.on('mouseover mousedown', e => this.$root.$emit('SELECTED_BRIGADE', brigadeGeodata, e.type));
          marker.on('mouseout', () => this.$root.$emit('UN_SELECTED_BRIGADE'));

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
      /**
       * Механизм работы с тултипами. Показать/скрыть все. Показать только один
       * если open==true открыть , если element есть, открывать только один
       */
      showMarkers(open, element) {
        this.isVisiblePopups = open;

        for (let callId in callMarkersMap) {
          let call = callMarkersMap[callId];

          call && call.openPopup && call[open ? 'openPopup' : 'closePopup']();
        }

        for (let ordersId in brigadeMarkersMap) {
          let brigade = brigadeMarkersMap[ordersId];

          brigade.openPopup && brigade[open ? 'openPopup' : 'closePopup']();
        }

        if (element) {
          brigadeMarkersMap && brigadeMarkersMap[element] && brigadeMarkersMap[element]['openPopup']();
          callMarkersMap && callMarkersMap[element] && callMarkersMap[element]['openPopup']();
          this.isVisiblePopups = true;
        }
      },
      /**
       * Скрытие/показ бригад
       */
      hideBrigades() {
        if (this.isVisibleOnlineBrigades) {
          this.layerOnlineBrigade.removeFrom(application.map);
        } else {
          this.layerOnlineBrigade.addTo(application.map);
        }
        this.isVisibleOnlineBrigades = !this.isVisibleOnlineBrigades;
        this.statePopupButton();
      },
      /**
       * Скрытие/показ вызовов
       */
      hideCalls() {
        if (this.isVisibleOnlineCalls) {
          this.layerOnlineCall.removeFrom(application.map);
          this.$root.$emit('UN_SELECTED_CALL', 'forse');
        } else {
          this.layerOnlineCall.addTo(application.map);
        }
        this.isVisibleOnlineCalls = !this.isVisibleOnlineCalls;
        this.statePopupButton();
      },
      statePopupButton() {
        if (!this.isVisibleOnlineBrigades && !this.isVisibleOnlineCalls) this.isVisiblePopups = false
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
      this.layerOnlineCall = L.layerGroup().addTo(application.map);

      // application.map.on('zoomstart', () => this.smootHRunningMarkers(false));
      // application.map.on('zoomend', () => this.smootHRunningMarkers(true));

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

      this.$root.$on('SHOW_MARKERS', this.showMarkers);
      this.$root.$on('MANAGER_LAYERS', this.managerLayers);
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
    left: 409px;
    top: 20px;
    background: #FFFFFF;
    border-radius: 3px;
    padding: 20px 7px;
    border: none;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    cursor: pointer;
  }

  .triggerShowButton.trig-auto {
    background: url('../assets/edit/car_gray.png') no-repeat;
    background-position-y: 50%;
    left: 376px;
  }

  .triggerShowButton.trig-call {
    left: 343px;
    background: url('../assets/edit/call_gray.png') no-repeat;
    background-position-y: 50%;
  }

  .triggerShowButton.trig-tooltip {
    background: url('../assets/edit/tooltip.png') no-repeat;
    background-position-y: 50%;
    background-position-x: 50%;
  }
</style>
