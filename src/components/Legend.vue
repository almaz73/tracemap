отобразив все
<template>
  <div>
    <div class="menu-legend" v-if="brigadesOrdersIds.length || callIds.length" @click="clearSelected()">{{selectedText}}
      - {{brigadesOrdersIds.length|| callIds.length}}
      <div class="close-button-menu">&#10006;</div>
    </div>
    <div class="legend" :class="{closed : !isOpened}" @click="trigger()">
      <div class="head" v-if="!isOpened">
        <img src="../assets/images/star.png"/>
        Легенда
      </div>
      <div class="close-button" v-if="isOpened" @click="clearSelected()">&#10006;</div>

      <div class="elem" v-if="isOpened" v-for="(el, ind) in labelsAssigned" :key="ind" @click="onClick(el)"
           :style="{'cursor':countMarkers[el.img]?'pointer':'default'}"
           :class="{active:countMarkers[el.img]}"
      >
        <div v-if="ind==0" class="title-type">Вызовы:</div>
        <img :src="require('../assets/images/ambulance/'+el.img+'.png')"/>
        <img :src="require('../assets/images/ambulance/assigned/'+el.img+'.png')"/>
        <span>{{el.text}} </span><sup>{{countMarkers[el.img]}}</sup>
      </div>

      <div class="elem" v-if="isOpened" v-for="(el, ind) in labels" :key="'b'+ind" @click="onClick(el)"
           :style="{'cursor':countMarkers[el.img]?'pointer':'default'}"
           :class="{active:countMarkers[el.img]}"
      >
        <div v-if="ind==0" class="title-type">Бригады:</div>
        <img :src="require('../assets/images/ambulance/brigadeStatus/'+el.img+'.png')"/>
        <span>{{el.text}} </span><sup>{{countMarkers[el.img]}}</sup>
      </div>
      <div class="checkbox-all" v-if="isOpened" @click.stop="checkB = !checkB">
        <input type="checkbox" :checked="checkB"/> Все маркеры в пределах видимости
      </div>
    </div>
  </div>
</template>

<script>
  import application from '../assets/js/application';

  export default {
    name: "Legend",
    data() {
      return {
        isOpened: false,
        png: '../assets/images/ambulance/brigadeStatus/atStation.png',
        brigadesOrdersIds: [],
        callIds: [],
        selectedText: '',
        countMarkers: {},
        isChosen: false, // параметр для оптимизации, чтобы не перерисовывал, если не надо перерисовывать маркеры
        checkB: false // если true карту масштабируем чтобы охватить все маркеры
      }
    },
    props: {
      labels: {
        type: Array
      },
      labelsAssigned: {
        type: Array
      }
    },
    methods: {
      trigger() {
        this.isOpened = !this.isOpened;
        if (!this.isOpened && !this.callIds.length && !this.brigadesOrdersIds.length) this.clearSelected();
        this.$store.dispatch('setTools', {tool: null, val: null});
        this.$root.$emit('UN_SELECTED_CALL', 'forse');
        this.$root.$emit('UN_SELECTED_BRIGADE', 'forse');
        if (this.isOpened) {
          this.brigadesOrdersIds = [];
          this.callIds = [];
          this.goCountMarkers();
        } else {
          this.countMarkers = {}
        }
      },
      goCountMarkers() {
        Object.keys(application.callMarkersMap).map(id => {
          let el = application.callMarkersMap[id].options.icon.options.img;
          if (!this.countMarkers[el]) this.countMarkers[el] = 1;
          else this.countMarkers[el] += 1;
        });

        Object.keys(application.brigadeMarkersMap).map(id => {
          let el = application.brigadeMarkersMap[id].options.icon.options.img;
          if (!this.countMarkers[el]) this.countMarkers[el] = 1;
          else this.countMarkers[el] += 1;
        });
      },
      onClick(el) {
        // нажатие пиктограммы оставит на карте соответствующие ей вызовы или бригады
        Object.keys(application.brigadeMarkersMap).map(id => {
          if (application.brigadeMarkersMap[id].options.icon.options.img === el.img) this.brigadesOrdersIds.push(+id)
        });

        Object.keys(application.callMarkersMap).map(id => {
          if (application.callMarkersMap[id].options.icon.options.img === el.img) this.callIds.push(+id)
        });

        this.selectedText = el.text;
        if (this.brigadesOrdersIds.length || this.callIds.length) {
          this.isChosen = true;
          this.$root.$emit('MANAGER_LAYERS', {
            brigadesOrdersIds: this.brigadesOrdersIds,
            callIds: this.callIds
          }, this.checkB);
        }
      },
      clearSelected() {
        if (this.isChosen) {
          this.$root.$emit('MANAGER_LAYERS', null, this.checkB);
          this.isChosen = false;
        }
        this.brigadesOrdersIds = [];
        this.callIds = [];
      }
    },
    mounted() {
      this.$store.subscribe(() => {
        if (this.isOpened && this.$store.getters.tools.length) this.isOpened = null
      })
    }
  }
</script>

<style scoped>
  .menu-legend {
    z-index: 10;
    position: absolute;
    top: 156px;
    left: 20px;
    background: white;
    box-shadow: 2px 2px 5px #999;
    padding: 10px 20px;
    padding-right: 30px;
    max-width: 320px;
    overflow: hidden;
  }

  .legend {
    z-index: 2;
    position: absolute;
    bottom: 60px;
    left: 20px;
    background: white;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    font-size: 14px;
    min-width: 258px;
    border-radius: 3px;
    padding: 7px 16px 5px 10px;
  }

  .legend div {
    line-height: 12px;
  }

  .title-type {
    margin: 10px;
    font-weight: bold;
  }

  .legend.closed {
    border-radius: 40px !important;
    min-width: inherit !important;
  }

  .head {
    cursor: pointer;
  }

  .head img {
    vertical-align: middle;
    margin-right: 3px;
  }

  .elem.active:hover img {
    margin-left: -1px;
    margin-right: 1px;
  }

  .elem.active span:hover {
    text-decoration: underline #999;
    color: black;
  }

  .elem {
    display: table;
  }

  .close-button {
    position: absolute;
    right: 10px;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
  }

  .close-button:hover {
    border: 1px solid #ddd;
    margin: -1px;
  }

  .close-button-menu {
    position: absolute;
    top: 3px;
    right: 3px;
    padding: 1px 4px;
    border-radius: 4px;
    cursor: pointer;
  }

  .close-button-menu:hover {
    border: 1px solid #ddd;
    margin: -1px;
  }

  .legend sup {
    color: red
  }

  .checkbox-all {
    padding: 12px 0 3px 0;
    cursor: pointer;
  }

  .checkbox-all:hover {
    text-decoration: underline;
  }
</style>
