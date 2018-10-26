<template>
  <div class="root">

    <!--<div class="container head">+ Добавить TC</div>-->

    <!--<div class="container head">+ Добавить группу</div>-->
    <!--<hr width="90%"/>-->

    <label v-for="(el, k) in layers" :key="k" class="container">
      <span class="text" :class="{full: isFull(el), mark: true}" @click.stop="twoFunction(el)">
        {{el.stationName}}
      </span>
      <span v-if="isChildren(el)" class="triangle"><div :class="traingleClass(el)" @click.stop="twoFunction(el)"></div></span>

      <label class="container" v-if="check('~|'+el.id)" v-for="(el2, k2) in el.children" :key="k2">
        <span class="text" :class="{full: isFull(el2)}" @click.stop="twoFunction(el2)">
          {{el2.stationName}}
        </span>

        <span v-if="isChildren(el2)" class="triangle"><div :class="traingleClass(el2)"
                                                           @click.stop="twoFunction(el2)"></div></span>
        <label v-if="check('~|'+el2.id)" class="container" v-for="(el3, k4) in el2.children" :key="k4+'-label'">
          <span class="text" :class="{full: isFull(el3)}" @click.stop="twoFunction(el3)">
            {{el3.stationName}}
          </span>
          <span v-if="isChildren(el3)" class="triangle"><div :class="traingleClass(el3)"
                                                             @click.stop="twoFunction(el3)"></div></span>
          <!-- автомобили3 -->
          <label v-if="check('~L'+el3.id)" class="container auto" v-for="(item3, k5) in el3.automobiles" :key="k5"
                 @click.stop="showAuto(item3.id)">
            <input type="checkbox" @click.stop="" :checked="check(item3.id)">
            <span class="checkmark"></span>
            <span class="text">{{item3.regNum}}</span>
            <img @click="openSetPanel(el3, item3)" class="set" src="../../assets/images/set.png"/>
          </label>
          <!-- end автомобили3 -->
        </label>

        <!-- автомобили2 -->
        <label v-if="check('~L'+el2.id)" class="container auto" v-for="(item2, k3) in el2.automobiles" :key="k3"
               @click.stop="showAuto(item2.id)">
          <input type="checkbox" @click.stop="" :checked="check(item2.id)">
          <span class="checkmark"></span>
          <span class="text">{{item2.regNum}}</span>
          <img @click="openSetPanel(el2, item2)" class="set" src="../../assets/images/set.png"/>
        </label>
        <!-- end автомобили2 -->
      </label>

      <!-- автомобили -->
      <label v-for="(item) in el.automobiles" :key="item.id" v-if="check('~L'+el.id)" class="container auto"
             @click.stop="showAuto(item.id)">
        <input type="checkbox" @click.stop="" :checked="check(item.id)">
        <span class="checkmark"></span>
        <span class="text">{{item.regNum}}</span>
        <img @click.stop="openSetPanel(item.id)" class="set" src="../../assets/images/set.png"/>
      </label>


      <!-- end автомобили -->
    </label>
  </div>
</template>

<script>
  export default {
    name: "Brigades",
    props: {
      layers: {type: Array}
    },
    methods: {
      isChildren(el) {
        return (el.automobiles && el.automobiles.length) || (el.children && el.children.length);
      },
      traingleClass(el) {
        return this.check('~L' + el.id) ? 'block' : 'block0';
      },
      isFull(el) {
        return (el.children && el.children.length) || (el.automobiles && el.automobiles.length);
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
      showAuto(id, noRequest) {
        console.log("...... idididid=", id)
        this.$store.dispatch('setBrigade', id);
        if (!noRequest) this.$root.$emit('showCarTraces', id, this.check(id));
      },
      openSetPanel(id) {
        this.$root.$emit('showBrigadeWayHistory', id);
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

  .container {
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

  .container.auto {
    padding-left: 50px;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    position: absolute;
    top: 5px;
    left: 20px;
    height: 18px;
    width: 18px;
    background-color: #eee;
  }

  .container.auto:hover input ~ .checkmark {
    background-color: #ccc;
  }

  .container input:checked ~ .checkmark {
    background-color: #5973ff;
    /*#2196F3;*/
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 5px;
    top: 2px;
    width: 5px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
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
