<template>
  <div class="root">
    <div class="container head">+ Добавить TC</div>
    <div class="container head">+ Добавить группу</div>
    <hr width="90%"/>
    <div class="combo">
      <label class="container " v-for="(el, index) in objectLayers" :key="index" @click="showElement(el)">
        <input type="checkbox" @click.stop="" :checked="check(el.id)">
        <span class="checkmark"></span>
        <span class="triangle" v-if="el.children && el.children.length" @click.stop="showLevel(el.id)">
        <div :class="{'block0' : !check('#L'+el.id), 'block': check('#L'+el.id)}"></div>
      </span>
        <span class="text">{{el.name}}</span>

        <label
          v-if="check('#L'+el.id)"
          class="container"
          v-for="(el2, index2) in el.children"
          :key="index2"
          @click.stop="showElement(el2)"
        >
          <input type="checkbox" @click.stop="" :checked="check(el2.id)">
          <span class="checkmark"></span>
          <span class="triangle" v-if="el2.children && el2.children.length" @click.stop="showLevel(el2.id)">
          <div :class="{'block0' : !check('#L'+el2.id), 'block': check('#L'+el2.id)}"></div>
        </span>
          <span class="text">{{el2.name}}</span>

          <label
            v-if="check('#L'+el2.id)"
            class="container"
            v-for="(el3, index3) in el2.children"
            :key="index3"
            @click.stop="showElement(el3)"
          >
            <input type="checkbox" @click.stop="" :checked="check(el3.id)">
            <span class="checkmark"></span>
            <span class="triangle" v-if="el3.children && el3.children.length" @click.stop="showLevel(el3.id)">
            <div :class="{'block0' : !check('#L'+el3.id), 'block': check('#L'+el3.id)}"></div>
          </span>
            <span class="text">{{el3.name}}</span>

            <label
              v-if="check('#L'+el3.id)"
              class="container"
              v-for="(el4, index3) in el3.children"
              :key="index3"
              @click.stop="showElement(el4)"
            >
              <input type="checkbox" @click.stop="" :checked="check(el4.id)">
              <span class="checkmark"></span>
              <span class="text">{{el4.name}}</span>
            </label>

          </label>

        </label>

      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Zones",
    props: {
      objectLayers: {
        type: Array,
        default() {
          return [
            {
              regNum: "Районы",
              polyline: [[55.8, 49.19], [55.82, 49.192]],
              children: [
                {
                  regNum: "22Водные объекты плош.",
                  children: [
                    {regNum: "33Населенные пункты", polyline: [[55.84, 49.19], [55.826, 49.198]]},
                    {regNum: "33Дороги (улицы)", polyline: [[55.85, 49.19], [55.827, 49.190]]},
                    {
                      regNum: "33Строения",
                      children: [
                        {regNum: "44Строения"},
                        {regNum: "44Водные объекты плош."},
                        {regNum: "44Водные объекты лин."}
                      ]
                    }
                  ]
                },
                {regNum: "22Водные объекты лин."},
                {regNum: "22Растительность площ"}
              ]
            },
            {regNum: "Населенные пункты", polyline: [[55.84, 49.19], [55.826, 49.198]]},
            {regNum: "Дороги (улицы)", polyline: [[55.85, 49.19], [55.827, 49.190]]},
            {regNum: "Строения"},
            {regNum: "Водные объекты плош."},
            {regNum: "Водные объекты лин."},
            {regNum: "Растительность площ"},
            {regNum: "Просеки"},
            {
              regNum: "Цветная линия",
              polyline: [
                [55.787273, 49.198124],
                [55.782772, 49.198516],
                [55.785767, 49.187106],
                [55.776569, 49.192082],
                [55.771863, 49.197120],
                [55.768354, 49.195178]
              ],
              color: ['#bd0026', '#f03b20', '#fd8d3c', '#fecc5c', '#ffffb2', '#bd0026']
            }
          ]
        }
      }
    },
    data() {
      return {
        cascad: true // вложенные папки тоже будут выбраны при выборе папки
      }
    },
    methods: {
      check(val) {
        return this.$store.state.editLayers.indexOf(val) > -1;
      },
      showElement(el) {
        let bool = this.$store.state.editLayers.indexOf(el.id) === -1;

        if (this.cascad) {
          this.selectAllChildren(el, bool)
        } else {
          this.$store.dispatch('setEditLayer', el.id);
          this.$root.$emit('selectedLayer', el.id, bool);
        }
      },
      selectAllChildren(el, bool) {
        let that = this;
        if (el.children) {
          accept(el, bool);
          el.children.map(item => {
            accept(item, bool);
            if (item.children && item.children.length) this.selectAllChildren(item, bool);
          });
        }

        function accept(el, bool) {
          if (that.$store.getters.editLayers.includes(el.id)) {
            if (!bool) {
              that.$store.dispatch('setEditLayer', el.id);
              that.$root.$emit('selectedLayer', el.id, bool);
            }
          } else if (bool) {
            that.$store.dispatch('setEditLayer', el.id);
            that.$root.$emit('selectedLayer', el.id, bool);
          }
        }
      },
      showLevel(id) {
        this.$store.dispatch('setEditLayer', "#L" + id);
      }
    }
  }
</script>

<style scoped>
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
    padding: 8px 0;
  }

  .combo {
    max-height: 400px;
    overflow-y: auto;
  }

  .combo {
    cursor: pointer;
    margin: 0;
    border-bottom: 1px solid #f5f5f5;
    border-radius: 3px;
    line-height: 38px;
  }

  /* Customize the label (the container) */
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

  .container .text {
    margin-left: 15px;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 5px;
    left: 8px;
    height: 18px;
    width: 18px;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /*.container:hover{*/
  /*background: #f5f5f5;*/
  /*}*/

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
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
    /*background: blanchedalmond;*/
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

</style>
