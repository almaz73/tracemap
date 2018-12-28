<template>
  <div class="draggableP" ref="me" @mouseleave="speedPanel=false">
    <div class="draggableP-head">
      <div class="draggableP-head-speed">{{distance}} км / {{time}} ч.</div>
      <div class="draggableP-head-name" :title="typeGroup+': '+name">{{name}}</div> &nbsp;

      <input class="inp" @change="durationChanged()" v-model="duration" @mousemove="speedPanel=true"
             type="number" min="5" step="5"
             title="Длительность просмотра
всего пути в секундах"/>
      <span class="score-speed-panel" v-if="speedPanel">
        <span @click="speedClick(0)">10сек</span>
        <span @click="speedClick(1)">30сек</span>
        <span @click="speedClick(2)">1мин</span>
        <span @click="speedClick(3)">5мин</span>
        <span @click="speedClick(4)">30мин</span>
        <span @click="speedClick(5)">1час</span>
        <span @click="speedClick(6)">1:1</span>
        <span @click="speedClick(7)">1:2</span>
        <span @click="speedClick(8)">1:4</span>
      </span>
      <div class="draggableP-head-x" @click="$emit('close')">х</div>
    </div>
    <div class="draggableP-content" v-if="!isShow">
      <span class="left" style="float: left" @click="showClick()">{{dateStart}}</span>
      <span class="middle" @click="playClick(true)" v-if="!isPlay">&#10073;&#10073;</span>
      <span class="middle" @click="playClick(false)" v-else>&#9654;</span>
      <span class="right" style="float: right">{{dateEnd}}</span>
    </div>
  </div>
</template>

<script>

  import pleerOfMap from '../components/pleerOfMap.js';

  export default {
    name: 'MotionPanel',
    props: {
      historyData: {type: Object}
    },
    data() {
      return {
        isShow: true,
        isPlay: true,
        name: '',
        distance: '',
        time: '',
        typeGroup: '',
        duration: 30, // 30 сек по умолчанию на промотку всей пути ...
        speedPanel: false,
        dateStart: '',
        dateEnd: '',
      };
    },
    created() {
      this.moveAlarms = function () {
        let elem = this.$refs.me;

        if (!elem) return;

        elem.onmousedown = e => {
          let coords = this.getCoords(elem);
          let shiftX = e.pageX - coords.left;
          let shiftY = e.pageY - coords.top;

          // список элементов, на которых перетаскивание отключается
          if (['draggableP-head-x', 'draggableP-elem-x']
            .includes(e.target.className)) return e.stopPropagation();

          moveAt(e);

          function moveAt(e) {
            elem.style.left = e.pageX - shiftX + 'px';
            elem.style.top = e.pageY - shiftY + 'px';
          }

          document.onmousemove = e => moveAt(e);

          elem.onmouseup = () => {
            document.onmousemove = null;
            elem.onmouseup = null;
          };
        };

      };
    },
    methods: {
      getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
      },
      playClick(val) {
        this.isPlay = val;
        pleerOfMap.playClick(this.isPlay);
      },
      showClick(val) {
        pleerOfMap.showClick();
      },
      pleerCallBack(val) {
        this.isPlay = val;
      },
      durationChanged() {
        pleerOfMap.durationChanged(this.duration);
      },
      speedClick(cod) {
        switch (cod) {
          case 0:
            this.duration = 10;
            break;
          case 1:
            this.duration = 30;
            break;
          case 2:
            this.duration = 60;
            break;
          case 3:
            this.duration = 300;
            break;
          case 4:
            this.duration = 1800;
            break;
          case 5:
            this.duration = 3600;
            break;
          case 6:
            this.duration = this.time * 3600;
            break;
          case 7:
            this.duration = this.time * 3600 * 2;
            break;
          case 8:
            this.duration = this.time * 3600 * 4;
            break;
        }
        this.speedPanel = false;
        this.durationChanged();
      },
      getDateFormat(date) {
        return ('0' + date.getDate()).substr(-2) + '-' +
          ('0' + (date.getMonth() + 1)).substr(-2) + '-' +
          date.getFullYear() + ' ( ' +
          ('0' + date.getHours()).substr(-2) + ':' +
          ('0' + date.getMinutes()).substr(-2) + ' )';
      }
    },
    mounted() {
      let waitPanel = () => {
        if (this.$refs.me) {
          this.isShow = !this.isShow;
        } else setTimeout(() => waitPanel(), 1);
      };
      waitPanel();

      let historyData = this.historyData;
      this.name = historyData.info.name;
      this.distance = historyData.distance;
      this.typeGroup = historyData.info.automobileId ? 'Автомобиль' : 'Бригада';

      let periodStart = new Date(historyData.periodStart);
      let periodEnd = new Date(historyData.periodEnd);
      this.dateStart = this.getDateFormat(periodStart);
      this.dateEnd = this.getDateFormat(periodEnd);

      let delta = periodEnd.getTime() - periodStart.getTime();
      this.time = delta / 3600000;
      pleerOfMap.callBack = this.pleerCallBack; // чтобы после окончания движения кнопку плеера изменить
      pleerOfMap.show(historyData, this.duration);

      // отлавливаем нажатие на карту, и находим ближайший узел линии
      this.$root.$on('onMapClick', function (e) {
        if (e.latlng) pleerOfMap.findNode(e.latlng.lat, e.latlng.lng)
      });

      this.$store.dispatch('setShowTool', false);
    },
    beforeDestroy() {
      pleerOfMap.clear();
    },
    updated() {
      this.moveAlarms();
    }
  };
</script>

<style>
  :root {
    --radius: 4px;
  }

  .draggableP-head, .draggableP {
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .draggableP {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 320px;
    height: 30px;
    background: #c3c3c3;
    position: absolute;
    bottom: 120px;
    left: calc(50% - 160px);
    z-index: 3;
  }

  .draggableP-head {
    line-height: 30px;
    text-indent: 10px;
    background: #47494e;
    color: white;
    width: 100%;
    cursor: pointer;
    height: 30px;
    font-size: 13px;
  }

  .draggableP-content {
    height: 35px;
    background: #c3c3c3;
    padding: 10px;
    overflow-y: auto;
  }

  .draggableP-head-x {
    border-radius: 0 var(--radius) 0 0;
    padding: 0px 15px 0 5px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 4;
  }

  .draggableP-head-x:hover {
    background: #57595e;
  }

  .draggableP-content span {
    font-size: 13px;
  }

  .draggableP-content span.middle {
    margin: 0 auto;
    font-size: 30px;
    position: absolute;
    top: 35px;
    padding: 5px;
    line-height: 16px;
    left: calc(50% - 14px);
    cursor: pointer;
  }

  .draggableP-content span.left:hover {
    cursor: pointer;
  }

  .draggableP-head .inp {
    position: absolute;
    right: 38px;
    top: 5px;
    width: 60px;
    background: white;
    color: black;
    height: 21px;
    text-align: center
  }

  .draggableP-head-name {
    font-size: 15px;
    width: 130px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .draggableP-head-speed {
    position: absolute;
    left: 120px;
  }

  .score-speed-panel {
    position: absolute;
    background: wheat;
    color: black;
    font-size: 11px;
    left: 0;
    top: 30px;
    width: 100%;
    z-index: 10;
    text-align: center
  }

  .score-speed-panel span {
    padding: 3px;
  }

  .score-speed-panel span:hover {
    background: #bd5a35;
  }
</style>
