<template>
  <div class="draggable" ref="me">
    <div class="draggable-head">{{typeGroup}}: <span style="font-size: 16px">{{name}}</span> &nbsp; {{distance}} км /
      {{time}} ч.
      <input class="inp" @change="durationChanged()" v-model="duration"
             type="number" min="5" step="5"
             title="Длительность ускоренного
       просмотра в секундах"/>
      <div class="draggable-head-x" @click="$emit('close')">х</div>
    </div>
    <div class="draggable-content" v-if="!isShow">
      <span class="left" style="float: left" @click="showClick()">12-11-2018 08:00</span>
      <span class="middle" @click="playClick(true)" v-if="!isPlay">&#10073;&#10073;</span>
      <span class="middle" @click="playClick(false)" v-else>&#9654;</span>
      <span class="right" style="float: right">12-11-2018 12:00</span>
    </div>
  </div>
</template>

<script>

  import pleerOfMap from '../components/pleerOfMap.js';
  // import historyData from '../components/historyData.js'

  export default {
    name: 'MotionPanel',
    props:{
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
        duration: 30
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
          if (['draggable-head-x', 'draggable-elem-x']
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
      durationChanged(val) {
        pleerOfMap.durationChanged(this.duration);
      }
    },
    mounted() {
      let waitPanel = () => {
        if (this.$refs.me) {
          this.isShow = !this.isShow;
        } else setTimeout(() => waitPanel(), 1);
      };
      waitPanel();

      if(!this.historyData || !this.historyData.info) {
        this.$emit('close');
        return;
      }

      let historyData = this.historyData;

      this.name= historyData.info.name;
      this.distance = historyData.distance;
      this.typeGroup = historyData.info.automobileId ? 'Автомобиль' : 'Бригада';


      let delta = new Date(historyData.periodEnd).getTime() - new Date(historyData.periodStart).getTime();
      this.time = delta / 3600000;
      pleerOfMap.callBack = this.pleerCallBack; // чтобы после окончания движения кнопку плеера изменить
      pleerOfMap.show(historyData, this.duration);

      // отлавливаем нажатие на карту, и находим ближайший узел линии
      this.$root.$on('onMapClick', function (e) {
        if (e.latlng) pleerOfMap.findNode(e.latlng.lat, e.latlng.lng)
      });
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

  .draggable-head, .draggable {
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .draggable {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 320px;
    height: 30px;
    background: #c3c3c3;
    position: absolute;
    bottom: 120px;
    left: calc(50% - 160px);
    z-index: 3;
  }

  .draggable-head {
    line-height: 30px;
    text-indent: 10px;
    background: #47494e;
    color: white;
    width: 100%;
    cursor: pointer;
    height: 30px;
    font-size: 13px;
  }

  .draggable-content {
    height: 35px;
    background: #c3c3c3;
    padding: 10px;
    overflow-y: auto;
  }

  .draggable-head-x {
    border-radius: 0 var(--radius) 0 0;
    padding: 0px 15px 0 5px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 4;
  }

  .draggable-head-x:hover {
    background: #57595e;
  }

  .draggable-content span {
    font-size: 10px;
  }

  .draggable-content span.middle {
    margin: 0 auto;
    font-size: 30px;
    position: absolute;
    top: 35px;
    padding: 5px;
    line-height: 16px;
    left: calc(50% - 14px);
    cursor: pointer;
  }

  .draggable-content span.left:hover, .draggable-content span.right:hover {
    background: #9e9e9e;
    cursor: pointer;
  }

  .draggable-head .inp {
    position: absolute;
    right: 38px;
    top: 5px;
    width: 40px;
    background: white;
    color: black;
    height: 21px;
    text-align: center
  }
</style>
