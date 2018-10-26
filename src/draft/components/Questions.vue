<template>
  <div class="legend" :class="{closed : !isOpened}" @click="isOpened=!isOpened">
    <div class="head">
      <img src="../../assets/images/star.png"/>
      Ближайшие задачи
    </div>
    <br v-if="isOpened"/>
    <div v-if="isOpened">
      <pre>
1. Доработать дазайн BrigadeWayHistory.
2. Сделать BrigadeWayHistory в виде модального окна, чтобы выходил всегда посередине экрана.
3. В окне логине добавить фон с картой.
4. Подсоединить панель редактирования слоев (выбор цвета).
5. Прикрутить панельку просмотре истории к слоям бригад
      </pre>


    </div>

  </div>
</template>

<script>
  export default {
    name: "Questions",
    data() {
      return {
        isOpened: closed,
        png: '../assets/images/ambulance/brigadeStatus/atStation.png'
      }
    },
    props: {
      labels: {
        type: Array
      }
    }
  }
</script>

<style scoped>
  .legend {
    z-index: 2;
    position: absolute;
    top: 40px;
    right: 40px;

    background: white;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    font-size: 14px;
    min-width: 558px;
    max-width: 758px;
    border-radius: 3px;
    padding: 7px 16px 5px 10px;
    cursor: pointer;
  }

  .legend.closed {
    border-radius: 40px !important;
    min-width: inherit !important;
  }

  .head img {
    vertical-align: middle;
    margin-right: 3px;
  }
</style>
