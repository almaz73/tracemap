<template>
  <div>
    <div class="fon" @click="close()" :style="fonStyle"></div>
    <div class="panel" :style="panelStyle">
      <div style="float:left; font-size: 22px; cursor: pointer; margin-top: -10px" title="Дата последнего обновления">
        <span @click="$emit('nextPanel', -1)"> &#60; </span>
        <span @click="$emit('nextPanel', 1)"> &#62; </span></div>
      <br>
      <h2 style="color: #3250ff">{{historyPanelParams.name}}</h2><br>
      <h3>Выберите дату, время и отрезок времени:</h3><br>
      <hr size="0" color="#e5e5e5"/>

      <v-layout row wrap>
        <v-flex sm1>
        </v-flex>
        <v-flex sm10>
          <v-menu
            ref="menu1"
            :close-on-content-click="true"
            v-model="menu1"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            width="10px"
          >
            <v-text-field
              slot="activator"
              v-model="date1"
              label="Дата"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker
              v-model="date1"
              no-title
              color="blue lighten-1"
              locale="ru">
            </v-date-picker>
          </v-menu>

          <v-menu
            ref="menu2"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="time1"
            lazy
            transition="scale-transition"
            offset-y
            full-width
          >
            <v-text-field
              slot="activator"
              v-model="time1"
              class="date-select"
              label="время"
              prepend-icon="access_time"
            ></v-text-field>
            <v-time-picker
              color="blue"
              v-if="menu2"
              v-model="time1"
              format="24hr"
              full-width
              @change="$refs.menu2.save(time1)"
            ></v-time-picker>
          </v-menu>

          <v-flex>
            <v-text-field
              v-model="duration"
              label="Продолжительность в часах"
              @change="duration"
            ></v-text-field>
          </v-flex>
        </v-flex>
      </v-layout>

      <div v-if="historyLocalForage.join('').indexOf('_'+historyPanelParams.name+'_')>-1">
        <h3>Просмотренные:</h3>
        <div class="history-div">
        <div class="history-buttons" v-for="(but, index) in histButtons" :key="index"
              v-if="historyPanelParams.name==but.name"
              @click="clickHistory(but)"
              :title="but.time1+'-'+but.time2">{{but.date1}}
          <span class="x" @click="clickDeleteHistory(but)" title="Удалить">x</span></div>
        </div>
      </div>

      <div class="buttons">
        <button @click="report()">ПОЛУЧИТЬ ИСТОРИЮ ДВИЖЕНИЯ</button>
      </div>

    </div>
  </div>
</template>

<script>

  import localforage from 'localforage';

  export default {
    name: "BrigadesHistory",
    props: {
      historyPanelParams: Object
    },
    data() {
      return {
        date1: '',
        date2: '',
        duration: 1,
        time1: '09:00',
        time2: '10:00',
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false,
        histButtons: [],
        historyLocalForage: []
      }
    },
    computed: {
      panelStyle() {
        return {
          'left': this.historyPanelParams.x + 'px',
          'top': this.historyPanelParams.y + 'px',
          'display': this.historyPanelParams.show ? 'block' : 'none'
        }
      },
      fonStyle() {
        return {
          'display': this.historyPanelParams.show ? 'block' : 'none'
        }
      },
      lastUpd() {
        let date = new Date(this.historyPanelParams.lastUpdate);
        return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
      }
    },
    methods: {
      report: function () {
        this.historyPanelParams.startDate = this.date1 + 'T' + ('0' + this.time1).substr(-5) + ':00';

        this.duration = parseInt(this.duration);
        if (!this.duration) this.duration = 1;
        let time = new Date(this.date1 + ' ' + this.time1);
        time = new Date(time.getTime() + this.duration * 3600000);

        this.date2 = time.getFullYear() + '-' + ('0' + (time.getMonth() + 1)).slice(-2) + '-' + ('0' + time.getDate()).slice(-2);
        this.time2 = ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getSeconds()).slice(-2);
        this.historyPanelParams.endDate = this.date2 + 'T' + ('0' + this.time2).substr(-5) + ':00';
        this.$root.$emit('showCarTraces', true, this.historyPanelParams);
        this.historyPanelParams.show = false;
      },
      clickHistory(but) {
        this.date1 = but.date1;
        this.date2 = but.date2;
        this.time1 = but.time1;
        this.time2 = but.time2;
        this.report();
      },
      clickDeleteHistory(but) {
        this.historyLocalForage = this.historyLocalForage.filter(el => el && el !== but.oldName);
        this.histButtons = this.histButtons.filter(el => el.oldName !== but.oldName);
        localforage.setItem('HISTORY_BRIGADES', this.historyLocalForage);
        localforage.removeItem(but.oldName);
      },
      close: function () {
        this.historyPanelParams.show = false;
      }
    },
    created() {
      let date = new Date();
      this.date1 = this.date2 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      localforage.getItem('HISTORY_BRIGADES').then(
        his => {
          if (his) this.historyLocalForage = his;
          his && his.map(el => {
            if (!el) return;
            let arr = el.split("_");
            let arr1 = arr[2].split('T');
            let arr2 = arr[3].split('T');
            let date1 = arr1[0];
            let time1 = arr1[1].slice(0, -3);
            let date2 = arr2[0];
            let time2 = arr2[1].slice(0, -3);
            this.histButtons.push({name: arr[1], date1, time1, date2, time2, oldName: el})
          });
        }
      )
    }
  }
</script>

<style scoped>
  .fon {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 350px;
    background: white;
    box-shadow: 0 0 5px #999;
    z-index: 1000;
    padding: 12px 20px;
  }

  h3 {
    color: black;
    font-size: 15px;
  }

  .td-black {
    color: black;
    text-align: right;
  }

  .v-menu__content {
    top: 50px !important;
    left: 0 !important;
    color: red;
  }

  .buttons {
    margin-top: 10px;
    color: #3250ff;
    font-weight: bold;
    text-align: right;
  }

  .buttons button {
    padding: 6px;
  }

  .buttons button:hover {
    background: #eee;
  }

  .history-div {
    overflow: auto;
    max-height: 60px;
    min-height: 25px;
  }

  .history-buttons {
    border: 1px solid #9e9e9e;
    border-radius: 5px;
    margin: 3px;
    padding: 2px;
    padding-right: 0;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
  }

  .history-buttons .x {
    padding: 0px 3px;
  }

  .history-buttons .x:hover {
    background: #bbbbbb;
    height: 10px;
  }
</style>
