<template>
  <div>
    <Wait v-if="wait"/>
    <component :is="currentComponent" :historyData="historyData" @close="currentComponent=null"></component>
  </div>
</template>

<script>
  import * as axios from 'axios';
  import '../assets/js/movingMarker';
  import Wait from "../components/Wait";
  import MotionPanel from '../components/MotionPanel';
  import localforage from 'localforage';
  import swapLatLng from '../assets/js/swapLatLng.js';

  let cash = {};

  export default {
    name: "IntegrationBrigadeHistory",
    components: {Wait, MotionPanel},
    data() {
      return {
        wait: false,
        historyData: null,
        currentComponent: null,
        historyLocalForage: []
      }
    },
    methods: {
      async getHistory() {
        await axios.get('/ambulance/telematics/available-automobiles')
          .then(
            req => this.$emit('setCars', req.data),
            err => {
              this.$emit('setCars', [{stationName: '. . . нет данных . . . '}]);
              this.$store.dispatch('setNotification', err.response.data.message)
            }
          );
      },
      showCarTrace(bool, item) {
        if (!bool) return;
        this.wait = true;
        this.currentComponent = null;

        if (this.historyLocalForage) { // нет ли уже в кэше компа
          let shortLetter = '_' + item.name + '_' + item.startDate + '_' + item.endDate;
          let letter = this.getLink(item);

          let exist = null;
          this.historyLocalForage.map(el => {
            if (el === shortLetter) exist = shortLetter
          });

          if (!exist) {
            this.getCarTrace(item);
          } else {
            localforage.getItem(shortLetter).then(
              res => {
                if (res !== null) cash[letter] = {data: res};
                else this.getCarTrace(item);
                this.getCarTrace(item);
              }
            )
          }

        } else {
          this.getCarTrace(item);
        }


      },


      saveInLocalForage(letter, data) {
        let me = this;

        // запоминаем результаты вызова, чтобы повторно больше не запрашивать а брать из кэша
        localforage.getItem(letter).then(
          item => {
            if (item === null) {
              localforage.setItem(letter, data);
              me.historyLocalForage.push(letter);
              localforage.setItem('HISTORY_BRIGADES', me.historyLocalForage);
            }
          }
        )

      },

      getFromLocalForage(letter) {
        return localforage.getItem(letter);
      },

      getLink(item) {
        let letter = '/ambulance/telematics/history?startDate=' + item.startDate;
        if (item.endDate) letter += '&endDate=' + item.endDate;
        if (item.automobileId) letter += '&automobileId=' + item.automobileId;
        if (item.ordersId) letter += '&ordersId=' + item.ordersId;

        return letter;
      },

      async getCarTrace(item) {
        let that = this;
        let letter = this.getLink(item);
        let shortLetter = '_' + item.name + '_' + item.startDate + '_' + item.endDate;

        if (cash[letter]) { // нет ли уже в кэше
          doit(cash[letter]);
        } else { // загружаем
          await axios.get(letter)
            .then(
              resp => {
                // получили неподходящий json, меняем местами координаты lat lng
                resp = swapLatLng(resp);

                this.wait = false;
                cash[letter] = resp;

                if (resp.data.routes.length < 1) {
                  that.$store.dispatch('setNotification', 'Нет данных по движению');
                } else doit(resp, shortLetter)
              },
              err => {
                this.wait = false;
                that.$store.dispatch('setNotification', err.response.data.message)
              }
            )
        }

        function doit(resp, shortLetter) {
          that.saveInLocalForage(shortLetter, resp.data);
          that.historyData = resp.data;
          that.currentComponent = MotionPanel;
          that.wait = false;
        }
      },
    },
    mounted() {
      this.getHistory();
      this.$root.$on('showCarTraces', this.showCarTrace);

      localforage.getItem('HISTORY_BRIGADES').then(
        his => {
          if (his) this.historyLocalForage = his;
        }
      )

    }
  }
</script>
