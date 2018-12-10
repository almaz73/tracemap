<template>
  <div>
    <div class="fon" @click="close()" :style="fonStyle"></div>
    <div class="panel" :style="panelStyle">
      <h2 style="color: #3250ff">{{historyPanelParams.name}}</h2><br>
      <h3>Выберите дату:</h3><br>
      <hr size="0" color="#e5e5e5"/>

      <v-layout row wrap>
        <v-flex sm1>
          oт
        </v-flex>
        <v-flex sm6>
          <v-menu
            ref="menu1"
            :close-on-content-click="false"
            v-model="menu1"
            :nudge-right="40"
            :return-value.sync="date1"
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
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false">Отмена</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(date1)">Принять</v-btn>
            </v-date-picker>
          </v-menu>

        </v-flex>
        <v-flex sm5>
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
            max-width="290px"
            min-width="290px"
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
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex sm1>
          до
        </v-flex>
        <v-flex sm6>
          <v-menu
            ref="menu3"
            :close-on-content-click="false"
            v-model="menu3"
            :nudge-right="40"
            :return-value.sync="date2"
            lazy
            transition="scale-transition"
            offset-y
            width="10px"
          >
            <v-text-field
              max-width="50px"
              slot="activator"
              v-model="date2"
              label="Дата"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker
              v-model="date2"
              no-title
              color="blue lighten-1"
              locale="ru">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu3 = false">Отмена</v-btn>
              <v-btn flat color="primary" @click="$refs.menu3.save(date2)">Принять</v-btn>
            </v-date-picker>
          </v-menu>

        </v-flex>
        <v-flex sm5>
          <v-menu
            ref="menu4"
            :close-on-content-click="false"
            v-model="menu4"
            :nudge-right="40"
            :return-value.sync="time2"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="time2"
              class="date-select"
              label="время"
              prepend-icon="access_time"
            ></v-text-field>
            <v-time-picker
              color="blue"
              v-if="menu4"
              v-model="time2"
              format="24hr"
              full-width
              @change="$refs.menu4.save(time2)"
            ></v-time-picker>
          </v-menu>
        </v-flex>
      </v-layout>

      <hr size="0" color="#e5e5e5"/>
      <br>
      <h3>Данные:</h3>
      <table width="100%">
        <tr>
          <td>Последнее обновление:</td>
          <td class="td-black">{{lastUpd}}</td>
        </tr>
        <tr>
          <td>Координаты:</td>
          <td class="td-black" style="font-size: 11px">{{historyPanelParams.coord}}</td>
        </tr>
      </table>
      <h3>Статистика: ...</h3>
      <!--<table width="100%">-->
      <!--<tr>-->
      <!--<td>Пробег(rv):</td>-->
      <!--<td class="td-black">6,29</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td>Общая длительсность остановок:</td>-->
      <!--<td class="td-black">1:15:00</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td>Потери сигнала:</td>-->
      <!--<td class="td-black">3</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td>Общее время потери сигнала:</td>-->
      <!--<td class="td-black">1:06:15</td>-->
      <!--</tr>-->
      <!--</table>-->
      <!--<hr size="0" color="#e5e5e5"/>-->
      <!--<br>-->
      <!--<h3>Воспроизвести историю перемещения ТС</h3>-->
      <div class="buttons">
        <button @click="report()">НОВЫЙ ОТЧЕТ</button>
        <button @click="close()">ЗАКРЫТЬ</button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "BrigadesHistory",
    props: {
      historyPanelParams: Object
    },
    data() {
      return {
        date1: '',
        date2: '',
        time1: '8:00',
        time2: '10:00',
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false
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
        this.historyPanelParams.endDate = this.date2 + 'T' + ('0' + this.time2).substr(-5) + ':00';
        this.$root.$emit('showCarTraces', true, this.historyPanelParams);
        this.historyPanelParams.show = false;
      },
      close: function () {
        this.historyPanelParams.show = false;
      }
    },
    created() {
      let date = new Date();
      this.date1 = this.date2 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
    padding: 20px;
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
    margin-top: 30px;
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
</style>
