<template>
  <div class="panel" :style="myStyle">
    <div class="menu">
      <div style="pointer-events:none;">
        <img src="../../assets/images/combobox/createReport.png"/>
        Создать отчет
      </div>
      <div @click="openHistory()">
        <img src="../../assets/images/combobox/pen.png"/>
        Режим слежения за ТС
      </div>
      <div style="pointer-events:none;">
        <img src="../../assets/images/combobox/watch.png"/>
        Изменить данные ТС
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "BrigadesPanel",
    props: {
      menu: Object
    },
    computed: {
      myStyle() {
        return {
          'left': this.menu.x + 'px',
          'top': this.menu.y + 'px',
          'display': this.menu.show ? 'block' : 'none'
        }
      }
    },
    methods: {
      openHistory: function () {
        this.$emit('openPanel', 'history');
        this.menu.show = false
      }
    }
  }
</script>

<style scoped>
  .panel {
    position: absolute;
    z-index: 1000;
  }

  .menu {
    position: absolute;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.35);
    border-radius: 2px;
    width: 222px;
    padding-top: 8px;
  }

  .menu div {
    height: 40px;
    font-size: 14px;
    cursor: pointer;
  }

  .menu div:hover {
    background: #f1f1f1;
  }

  .menu img {
    margin: 7px 8px -7px 12px;
  }
</style>
