<template>
  <div class="combo">
    <div class="head">
      <span>номер бригады №№№</span>
    </div>
    <div class="hr" style="margin-top: 5px"></div>
    <div class="combo-item flexible">
      <div style="margin-left: 5px">
        <span class="header">Выберите дату</span>
        <div class="date-row flex">
          <v-layout row wrap>
            <v-flex>
              <v-menu
                ref="menu1"
                :close-on-content-click="false"
                v-model="menu1"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateFormatted"
                  label="От мм.дд.гггг"
                  persistent-hint
                  prepend-icon="event"
                  @blur="date = parseDate(dateFormatted)"
                ></v-text-field>
                <v-date-picker color="blue lighten-1" v-model="date" no-title @input="menu1 = false"></v-date-picker>

              </v-menu>
            </v-flex>
          </v-layout>
        </div>
        <div class="date-row flex">
          <v-flex>
            <v-menu
              ref="menu1"
              :close-on-content-click="false"
              v-model="menu1"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateFormatted"
                label="До мм.дд.гггг"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
              ></v-text-field>
              <v-date-picker color="blue lighten-1" v-model="date" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs11 sm5>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu3"
              :nudge-right="40"
              :return-value.sync="time"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="time"
                class="date-select"
                label="время"
                prepend-icon="access_time"
              ></v-text-field>
              <v-time-picker
                color="blue"
                v-if="menu3"
                v-model="time"
                full-width
                @change="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-flex>

        </div>
      </div>
      <div class="hr" style="margin-top: 5px"></div>
      <div style="margin-left: 5px">
        <span class="header">Статистика</span>
        <div class="history-info">
          <span>Пробег (км)</span>
        </div>
        <div class="history-info">
          <span>Общая длительность остановок</span>
          <span>123</span>
        </div>
        <div class="history-info">
          <span>Потери сигнала</span>
          <span>123</span>
        </div>
        <div class="history-info">
          <span>Общее время потери сигнала</span>
          <span>123</span>
        </div>
      </div>
      <div class="hr" style="margin-top: 5px"></div>
      <div style="margin-left: 5px">
        <span class="header">Воспроизвести историю перемещения ТС</span>
        <div class="flexible-row" style="justify-content: space-between;">

          <input type="button" style="width: 10px; margin-left: 5px"/>
          <span class="speed-type history-info">
            <!--<input type="radio" style="margin-left: 15px" value="1" v-model="radio"/>1x-->
            <!--<input type="radio" style="margin-left: 15px" value="2" v-model="radio"/>2x-->
            <!--<input type="radio" style="margin-left: 15px" value="3" v-model="radio"/>10x-->
            <!--<input type="radio" style="margin-left: 15px" value="4" v-model="radio"/>100x-->
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BrigadeWayHistory1",
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      time: "",
      menu2: false,
      menu3: false,
      modal2: false
    }),
    computed: {
      computedDateFormatted() {
        return this.formatDate(this.date)
      }
    },
    watch: {
      date(val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    methods: {
      formatDate(date) {
        if (!date) return null
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`
      },
      parseDate(date) {
        if (!date) return null
        const [month, day, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }

</script>

<style scoped>
  .theme--light.v-time-picker-clock  {
    background: black !important;
  }

  .v-menu__content {
    position: fixed;
    display: inline-block;
    border-radius: 2px;
    max-width: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    contain: content;
    will-change: transform;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  }

  .history-info {
    justify-content: space-between;
    display: flex;
    margin-left: -5px;
    margin-right: 5px;
  }

  .header {
    color: black;
    font-weight: bold;
  }

  .lable {
    width: 30px !important;
  }

  .date {
    width: 125px;
  }

  .date-row {
    margin-bottom: 5px;
    margin-left: 5px;
  }

  .flex {
    display: flex;
  }

  .flexible-row {
    flex-direction: row;
    display: flex;
    flex: 1;
  }

  .flexible {
    flex-direction: column;
    display: flex;
    flex: 1;
  }

  .lable {
    width: 10px;
  }

  .combo {
    width: 358px;
    background: #FFFFFF;
    border-radius: 3px;
    z-index: 20;
    position: absolute;
    top: 156px;
    left: 200px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
  }

  .combo img {
    cursor: pointer;
    position: relative;
    top: 6px;
  }

  .head {
    color: #304FFE;
    font-size: 14px;
    font-weight: 600;
    padding: 20px 26px;
    vertical-align: top;
  }

  .head span, .combo-item span {
    padding-left: 10px;
  }

  .combo-el {
    padding: 5px 0 0px;
  }

  .combo-el:hover {
    background: #f1f1f1;
  }

  .combo-el .img0 {
    padding-left: 28px;
  }

  /*.combo-item:hover {*/
  /*border: 1px solid red;*/
  /*margin: -1px;*/
  /*}*/

  .combo-item {
    padding: 7px 0px 12px;
    position: relative;
  }

  .hr {
    height: 1px;
    width: 90%;
    background: #ddd;
    margin: 0 auto;
    margin-top: 15px
  }

  .set {
    position: absolute !important;
    margin-top: -5px;
    right: 5px;
  }

  .setPanel {
    position: absolute;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.35);
    border-radius: 2px;
    width: 222px;
    top: 100px;
    padding-top: 8px;
  }

  .setPanel div {
    height: 40px;
    font-size: 14px;
    cursor: pointer;
  }

  .setPanel div:hover {
    background: #f1f1f1;
  }

  .setPanel img {
    margin: 0 8px 0 12px;
  }

  .setPanelBack {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

