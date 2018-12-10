<template>
  <div @mouseleave="mouseLeave">
    <BrigadesPanel :menu="menu" @openPanel="openPanel"/>
    <BrigadesHistory :historyPanelParams="historyPanelParams"/>

    <div class="root">
      <label v-for="(el, k) in layers" :key="k" class="cbox">
      <span class="text" :class="{full: isFull(el), mark: true}" @click.stop="twoFunction(el)">
        {{el.stationName}}
      </span>
        <span v-if="isChildren(el)" class="triangle">
        <div :class="traingleClass(el)" @click.stop="twoFunction(el)"></div></span>

        <label class="cbox" v-if="check('~|'+el.id)" v-for="(el2, k2) in el.children" :key="k2">
        <span class="text" :class="{full: isFull(el2)}" @click.stop="twoFunction(el2)">
          {{el2.stationName}}
        </span>
          <span v-if="isChildren(el2)" class="triangle">
          <div :class="traingleClass(el2)" @click.stop="twoFunction(el2)"></div></span>

          <label v-if="check('~|'+el2.id)" class="cbox" v-for="(el3, k4) in el2.children" :key="k4+'-label'">
          <span class="text" :class="{full: isFull(el3)}" @click.stop="twoFunction(el3)">
            {{el3.stationName}}
          </span>
            <span v-if="isChildren(el3)" class="triangle">
            <div :class="traingleClass(el3)" @click.stop="twoFunction(el3)"></div></span>

            <!-- автомобили3 -->
            <label v-if="check('~L'+el3.id)" class="cbox auto" v-for="item3 in el3.data" :key="item3.automobileId">
              <div class="div-checkbox" :class="{'checked':check(item3.automobileId)}">
                <div class="like"/>
              </div>
              <span class="text">{{item3.name}}</span>
              <img @mousedown="mousedown" @click.stop="openSetPanel(item3)" class="set"
                   src="../../assets/images/set.png"/>
            </label>
            <!-- end автомобили3 -->
          </label>

          <!-- автомобили2 -->
          <label v-if="check('~L'+el2.id)" class="cbox auto" v-for="item2 in el2.data" :key="item2.automobileId">
            <div class="div-checkbox" :class="{'checked':check(item2.automobileId)}">
              <div class="like"/>
            </div>
            <span class="text">{{item2.name}}</span>
            <img @mousedown="mousedown" @click.stop="openSetPanel(item2)" class="set"
                 src="../../assets/images/set.png"/>
          </label>
          <!-- end автомобили2 -->
        </label>

        <!-- автомобили -->
        <label v-for="item in el.data" class="cbox auto" v-if="check('~L'+el.id)" :key="item.automobileId">
          <div class="div-checkbox" :class="{'checked':check(item.automobileId)}">
            <div class="like"/>
          </div>
          <span class="text">{{item.name}}</span>
          <img @mousedown="mousedown" @click.stop="openSetPanel(item)" class="set"
               src="../../assets/images/set.png"/>
        </label>


        <!-- end автомобили -->
      </label>
    </div>
  </div>
</template>

<script>
  import BrigadesPanel from "../combobox/BrigadesPanel";
  import BrigadesHistory from '../combobox/BrigadesHistory'

  export default {
    name: "Brigades",
    components: {
      BrigadesPanel,
      BrigadesHistory
    },
    data() {
      return {
        menu: {show: false},
        historyPanelParams: {show: false}
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
        let id = item.automobileId;
        this.menu.automobileId = item.automobileId;
        this.menu.ordersId = item.ordersId;
        this.menu.name = item.name;
        this.menu.lastUpdate = item.lastUpdate;
        this.menu.coord = [item.latitude, item.longitude];

        // this.menu.lastUpdate = item.lastUpdate;
        // this.menu.latitude = item.latitude;
        // this.menu.longitude = item.longitude;
        // this.menu.speed = item.speed;

        // из сторе удаляем все ранее выбранные бригады
        this.$store.getters.brigades.map(el => typeof el === 'number' && el !== id && this.$store.dispatch('setBrigade', el));
        this.$store.dispatch('setBrigade', id);
      },
      mousedown($event) {
        this.menu.show = false;
        this.historyPanelParams.show = false;
        this.menu.x = $event.clientX - $event.offsetX + 30;
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
        }
      }
    }
  }
</script>


<style scoped>
  .head:hover {
    background: #f5f5f5;
  }

  .root {
    z-index: 10;
    position: absolute;
    top: 156px;
    left: 20px;
    background: white;
    min-height: 30px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    font-size: 14px;
    min-width: 358px;
    border-radius: 3px;
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
    margin-right: 10px;
  }

  img:hover {
    margin-right: 11px;
  }

</style>
