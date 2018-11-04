<template>
  <div class="fon" @click="$emit('close')">

    <div class="panel" @click.stop="">
      <div class="head">
        <span>номер бригады №№№</span>
      </div>
      <div class="hr" style="margin-top: 5px"></div>
      <div class="combo-item flexible">
        <div style="margin-left: 5px">
          <span class="header">Выберите дату</span>
          <div class="date-row flex">
            <label class="lable">От</label>
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

  </div>
</template>

<script>
  export default {
    name: "ModalChoiseDate"
  }
</script>

<style scoped>
  .fon {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0, .5);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .panel {
    padding: 10px;
    border: 1px solid #999;
    border-radius: 3px;
    box-shadow: 2px 2px 5px #555;
    background: white;
    width: 350px;
    height: 400px;

  }
</style>
