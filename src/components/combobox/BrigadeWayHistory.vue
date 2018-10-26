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
          <label class="lable">От</label>
          <v-flex >
            <v-menu
              ref="menu2"
              :close-on-content-click="false"
              v-model="menu2"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                label="Picker without buttons"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" @input="$refs.menu2.save(date)"></v-date-picker>

            </v-menu>
          </v-flex>

        </div>
        <div class="date-row flex">
          <label class="lable">До</label>
          <input class="date" type="date"/>
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
            <input type="radio" style="margin-left: 15px" value="1" v-model="radio"/>1x
            <input type="radio" style="margin-left: 15px" value="2" v-model="radio"/>2x
            <input type="radio" style="margin-left: 15px" value="3" v-model="radio"/>10x
            <input type="radio" style="margin-left: 15px" value="4" v-model="radio"/>100x
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "BrigadeWayHistory",
    data() {
      return {
        isSetVisible: false,
        radio: 1,
        menu2: false,
        date: null,
        menu: false,
        modal: false,
      }
    },
    methods: {
      data: () => ({
        date: null,
        menu: false,
        modal: false,
        menu2: false
      })
    }
  }
</script>

<style scoped>
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
    left: 600px;
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

