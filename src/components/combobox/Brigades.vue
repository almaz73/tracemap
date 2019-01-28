<template>
  <div @mouseleave="mouseLeave" @keyup.esc="clearFilter">
    <BrigadesPanel :menu="menu" @openPanel="openPanel"/>
    <BrigadesHistory :historyPanelParams="historyPanelParams" @nextPanel="nextPanel()"/>
    <BrigadesInfo :infoPanelParams="infoPanelParams" @nextPanel="nextPanel()"/>

    <div class="main-root">
      <input class="input-search" v-model="searchWord"
             ref="inputSearch"
             @keyup.enter="onEnter"
             @input="filter()"
             placeholder=" поиск бригады ..."
             title="поиск"
      >
      <div class="comment-search" v-if="searchWord">
        <span class="b-enter" v-if="selectedBrigade.length===1"
              @click="onEnter"
              title="Enter">↵</span>
        найдено: {{selectedBrigade.length}}
        <div class="close close-brigade" @click="clearFilter" title="Esc">✖</div>
      </div>
      <div class="close" @click="$store.dispatch('setTools', {tool: null, val: null})">✖</div>
      <div class="root">
        <label v-for="(el, k) in layers" :key="k" class="cbox">
      <span class="text" :class="{full: isFull(el), mark: true}" @click.stop="twoFunction(el)" :title="el.stationName">
        {{el.stationName.substr(0,32)}}{{el.stationName.length>32?'...':''}}
      </span>
          <span v-if="isChildren(el)" class="triangle">
        <div :class="traingleClass(el)" @click.stop="twoFunction(el)"></div></span>

          <label class="cbox" v-if="check('~|'+el.id)" v-for="(el2, k2) in el.children" :key="k2">
        <span class="text" :class="{full: isFull(el2)}" @click.stop="twoFunction(el2)" :title="el2.stationName">
          {{el2.stationName.substr(0,32)}}{{el2.stationName.length>32?'...':''}}
        </span>
            <span v-if="isChildren(el2)" class="triangle">
          <div :class="traingleClass(el2)" @click.stop="twoFunction(el2)"></div></span>

            <label v-if="check('~|'+el2.id)" class="cbox" v-for="(el3, k4) in el2.children" :key="k4+'-label'">
          <span class="text" :class="{full: isFull(el3)}" @click.stop="twoFunction(el3)" :title="el3.stationName">
            {{el3.stationName.substr(0,32)}} {{el3.stationName.length>32?'...':''}}
          </span>
              <span v-if="isChildren(el3)" class="triangle">
            <div :class="traingleClass(el3)" @click.stop="twoFunction(el3)"></div></span>

              <!-- автомобили3 -->
              <label v-if="check('~L'+el3.id)" class="cbox auto" v-for="item3 in el3.data" :key="item3.automobileId"
                     :class="{'changed-brigade':textSelectedBrigade.includes(item3.ordersId)}"
                     @mousedown="mousedown" @click.stop="openSetPanel(item3)"
              >
                <div class="div-checkbox" :class="{'checked':check(item3.automobileId)}">
                  <div class="like"/>
                </div>
                <span class="text">{{item3.name}}</span>
                <img class="set" src="../../assets/images/set.png"/>
              </label>
              <!-- end автомобили3 -->
            </label>

            <!-- автомобили2 -->
            <label v-if="check('~L'+el2.id)" class="cbox auto" v-for="item2 in el2.data" :key="item2.automobileId"
                   :class="{'changed-brigade': textSelectedBrigade.includes(item2.ordersId)}"
                   @mousedown="mousedown" @click.stop="openSetPanel(item2)"
            >
              <div class="div-checkbox" :class="{'checked':check(item2.automobileId)}">
                <div class="like"/>
              </div>
              <span class="text">{{item2.name}}</span>
              <img class="set" src="../../assets/images/set.png"/>
            </label>
            <!-- end автомобили2 -->
          </label>

          <!-- автомобили -->
          <label v-for="item in el.data" class="cbox auto" v-if="check('~L'+el.id)" :key="item.automobileId"
                 :class="{'changed-brigade':textSelectedBrigade.includes(item.ordersId)}"
                 @mousedown="mousedown" @click.stop="openSetPanel(item)"
          >
            <div class="div-checkbox" :class="{'checked':check(item.automobileId)}">
              <div class="like"/>
            </div>
            <span class="text">{{item.name}}</span>
            <img class="set" src="../../assets/images/set.png"/>
          </label>

          <!-- end автомобили -->
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  import BrigadesPanel from "../combobox/BrigadesPanel";
  import BrigadesHistory from '../BrigadesHistory'
  import BrigadesInfo from '../BrigadesInfo'
  import application from '../../assets/js/application';

  export default {
    name: "Brigades",
    components: {
      BrigadesPanel,
      BrigadesHistory,
      BrigadesInfo
    },
    data() {
      return {
        menu: {show: false},
        historyPanelParams: {show: false},
        infoPanelParams: {show: false},
        searchWord: '',
        selectedBrigade: [],
        parentParentId: null
      }
    },
    computed: {
      textSelectedBrigade() {
        return JSON.stringify(this.$store.getters.selectedBrigade);
      }
    },
    props: {
      layers: {type: Array}
    },
    methods: {
      isChildren(el) {
        return (el.data && el.data.length) || (el.children && el.children.length);
      },
      traingleClass(el) {
        return this.check('~L' + el.id) ? 'block' : 'block0';
      },
      isFull(el) {
        return (el.children && el.children.length) || (el.data && el.data.length);
      },
      check(val) {
        return this.$store.state.brigades.indexOf(val) > -1;
      },
      twoFunction(el) {
        this.menu.show = false;
        this.showStationList(el.id);
        this.showAutoList(el.id);
      },
      showStationList(id) {
        this.$store.dispatch('setBrigade', "~|" + id);
      },
      showAutoList(id) {
        this.$store.dispatch('setBrigade', "~L" + id);
      },
      openSetPanel(item) {
        this.menu.automobileId = item.automobileId;
        this.menu.ordersId = item.ordersId;
        this.menu.name = item.name;
        this.menu.lastUpdate = item.lastUpdate;
        this.menu.coord = [item.latitude, item.longitude];
        this.menu.speed = item.speed;

        // запомним выбранную бригаду
        this.$store.dispatch('setSelectedBrigade', [item]);
      },
      mousedown($event) {
        this.menu.show = false;
        this.historyPanelParams.show = false;
        this.infoPanelParams.show = false;
        this.menu.x = 360;
        this.menu.y = $event.clientY - $event.offsetY;
        this.menu.show = true;
      },
      mouseLeave() {
        this.menu.show = false;
      },
      openPanel(panel) {
        if (panel === 'history') {
          this.historyPanelParams = Object.assign({}, this.menu);
          this.historyPanelParams.show = true;
        } else if (panel === 'info') {
          this.infoPanelParams = Object.assign({}, this.menu);
          this.infoPanelParams.show = true;
        }
      },
      nextPanel() {
        let page = this.historyPanelParams.show;
        this.historyPanelParams = Object.assign({}, this.menu);
        this.infoPanelParams = Object.assign({}, this.menu);
        this.historyPanelParams.show = !page;
        this.infoPanelParams.show = page;
      },
      findBrigade(el, parentParentId) {
        let parentId = el.id;
        if (parentParentId) this.parentParentId = parentParentId;
        el.data && el.data.forEach(brigade => {
          if (brigade.name.toUpperCase().replace(/\s+/g, '').includes(this.searchWord.toUpperCase().replace(/\s+/g, ''))) {
            brigade.parentId = parentId;
            brigade.parentParentId = this.parentParentId;
            this.selectedBrigade.push(brigade);
          }
        });
        el.children && el.children.forEach(child => this.findBrigade(child));
        if (Array.isArray(el)) el.forEach(arr => this.findBrigade(arr, arr.id));
      },
      filter() {
        // находим и запоминаем массив искомых бригад, бригады выделятся рамкой
        this.selectedBrigade = [];
        this.findBrigade(this.layers);
        if (!this.searchWord) this.selectedBrigade = [];
        this.$store.dispatch('setSelectedBrigade', this.selectedBrigade);
        this.openBrunches();
      },
      /**
       * открываем узлы, где встречаются искомые бригады
       */
      openBrunches() {
        this.$store.dispatch('removeBrigades'); // чистим

        // возвращаем оставляем
        application.brigadeQueue.forEach(el => {
          if (el.automobileId) this.$store.dispatch('setBrigade', el.automobileId)
        });

        // собираем узлы и открываем ветки комбобокса
        let parentIds = {};
        this.selectedBrigade.forEach(brigade => parentIds[brigade.parentId] = parentIds[brigade.parentParentId] = true);

        Object.keys(parentIds).forEach(branch => {
          this.$store.dispatch('setBrigade', "~L" + branch);
          this.$store.dispatch('setBrigade', "~|" + branch);
        });
      },
      clearFilter() {
        this.searchWord = '';
        this.filter();
      },
      /**
       * Нажатие enter покажет выбранный маршурт, включит тултип бригады
       */
      onEnter() {
        if (!this.selectedBrigade.length) {
          this.$store.dispatch('setNotification', 'Такая бригада не надена');
          return;
        }
        let coord = [this.selectedBrigade[0].latitude, this.selectedBrigade[0].longitude];
        application.map.setView(coord, 13);

        this.$store.dispatch('clearTools'); // скрыть панель
        this.$root.$emit('MANAGER_LAYERS', {brigadesOrdersIds: [this.selectedBrigade[0].ordersId], noClean: true});
        this.$root.$emit('SHOW_MARKERS', false, this.selectedBrigade[0].ordersId)
      },

    },
    mounted() {
      this.$refs.inputSearch.focus();
    }
  }
</script>


<style scoped>
  .head:hover {
    background: #f5f5f5;
  }

  .main-root {
    z-index: 10;
    position: absolute;
    top: 156px;
    left: 20px;
    background: white;
    min-height: 30px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    font-size: 14px;
    min-width: 368px;
    border-radius: 3px;
  }

  .root {
    max-height: 410px;
    overflow-y: auto;
    padding: 8px 0;
  }

  .div-checkbox {
    position: relative;
    width: 19px;
    height: 19px;
    background: #eee;
    display: inline-block;
    margin: 3px 10px -3px -30px;
  }

  .div-checkbox.checked {
    background: #2196f3;
  }

  .like {
    position: absolute;
    left: 6px;
    top: 4px;
    width: 7px;
    height: 8px;
    border: solid #eee;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  .cbox {
    display: block;
    position: relative;
    padding-left: 20px;
    padding-right: 5px;
    cursor: pointer;
    line-height: 28px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-bottom: 1px solid #f9f9f9;
  }

  .cbox.auto {
    padding-left: 50px;
  }

  .cbox.auto:hover .div-checkbox {
    background: #ddd;
  }

  .cbox:hover > .div-checkbox.checked {
    background: #1186e3;
  }

  .cbox.auto:hover .div-checkbox .like {
    border-color: #ddd;
  }

  .triangle {
    position: relative;
    margin-left: 8px;
    margin-right: -16px;
    padding: 0 7px;
  }

  .block0 {
    content: '';
    position: relative;
    top: 0;
    left: 3px;
    border: 5px solid transparent;
    border-left: 6px solid #ccc;
    display: inline-block;
  }

  .block {
    content: '';
    position: relative;
    top: 3px;
    border: 5px solid transparent;
    border-top: 6px solid #ccc;
    display: inline-block;
  }

  .triangle:hover .block0 {
    border-left: 6px solid #999;
  }

  .triangle:hover .block {
    border-top: 6px solid #999;
  }

  .full:hover {
    color: blue;
    text-decoration-line: underline;
  }

  img {
    float: right;
  }

  img:hover {
    margin-right: 1px;
  }

  /** для выделения выбранной бригады*/
  .changed-brigade {
    border: 1px #ccc inset;
  }

  .input-search {
    margin: 10px;
    margin-top: 30px;
    margin-left: 20px;
    width: 325px;
    outline: none;
    border-bottom: 1px solid #ccc;
  }

  .close {
    position: absolute;
    line-height: 10px;
    border-radius: 4px;
    right: 6px;
    top: 6px;
    text-align: center;
    padding: 4px;
    cursor: pointer;
  }

  .close-brigade {
    top: 0;
    right: -17px;
  }

  .close:hover {
    border: 1px solid #ccc;
    margin: -1px;
  }

  .comment-search {
    width: 100px;
    position: absolute;
    right: 23px;
    top: 28px;
    color: #aaa;
  }

  .b-enter {
    border: 1px solid #999;
    padding: 0 5px;
    height: 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .b-enter:hover {
    background: #e5e5e5;
  }
</style>
