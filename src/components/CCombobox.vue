<template>
  <div class="combo">
    <div class="head">
      <img src="../assets/images/combobox/plus_white.png"/>
      <span style="">ДОБАВИТЬ ТС</span>
      <div style="clear: both; margin: 15px"></div>
      <img src="../assets/images/combobox/plus.png"/>
      <span>ДОБАВИТЬ ГРУППУ </span>
    </div>
    <div class="hr" style="margin-top: 5px"></div>
    <div @click="showGroup(el)" class="combo-el" v-for="el in groups" :key="el.id">
      <img @click.stop="onSelect(el)" class="img0" v-if="~stateCombo.selected.indexOf(el.id)"
           src="../assets/images/combobox/on.png"/>
      <img @click.stop="onSelect(el)" class="img0" v-else src="../assets/images/combobox/off.png"/>

      <img v-if="~stateCombo.opened.indexOf(el.id)" src="../assets/images/combobox/arrow-down.png"/>
      <img v-else src="../assets/images/combobox/arrow-right.png"/>

      <span> {{el.name}} {{el.content? "("+el.content.length+")":"(0)"}}</span>

      <div class="hr"></div>

      <div @click.stop="showGroup()"
           class="combo-item"
           v-if="~stateCombo.opened.indexOf(el.id)"
           v-for="(item, ind) in el.content" :key="ind">
        <img class="img0"
             v-if="~stateCombo.selectedItem.indexOf(el.id+'_'+item.name)"
             @click.stop="onSelect(el, item)"
             src="../assets/images/combobox/on.png"/>
        <img class="img0"
             v-else
             @click.stop="onSelect(el, item)"
             src="../assets/images/combobox/off.png"/>

        <img class="img0" v-if="item.alarm" src="../assets/images/combobox/elem-normal.png"/>
        <img class="img0" v-else src="../assets/images/combobox/elem-signal.png"/>

        <img v-if="item.stoped" src="../assets/images/combobox/p.png"/>

        <span>{{item.name}}</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "CCombobox",
    data() {
      return {
        stateCombo: {
          opened: [2],
          selected: [1, 2, 3, 4, 7],
          selectedItem: ["1_Авто 6", "1_Авто 4", "2_Авто 5", "3_Авто 8"]
        },
        groups: [
          {
            name: "Группа 1",
            id: 1,
            content: [{
              name: "Авто 4",
              stoped: true,
              alarm: false
            }, {
              name: "Авто 5",
              stoped: true,
              alarm: false
            }, {
              name: "Авто6",
              stoped: true,
              alarm: true
            }]
          }, {
            name: "Группа 2",
            id: 2,
            content: [{
              name: "Авто 4",
              stoped: true,
              alarm: false
            }, {
              name: "Авто 5",
              stoped: true,
              alarm: true
            }, {
              name: "Авто6",
              alarm: false
            }, {
              name: "Авто 7",
              alarm: false
            }]
          }, {
            name: "Группа 3",
            id: 3,
            content: [
              {
                name: "Авто 8",
                stoped: true,
                alarm: false
              }, {
                name: "Авто 9",
                stoped: true,
                alarm: false
              }
            ]
          }, {
            name: "Группа 4", id: 4
          }, {
            name: "Группа 5", id: 5
          }, {
            name: "Группа 6", id: 6
          }, {
            name: "Группа 7", id: 7
          }
        ]
      }
    },
    methods: {
      showGroup(el) {
        if (el) {
          let place = this.stateCombo.opened.indexOf(el.id);
          if (place > -1) this.stateCombo.opened.splice(place, 1);
          else this.stateCombo.opened.push(el.id);
        }
      },
      onSelect(el, item) {
        let groups = this.stateCombo.selected;
        let items = this.stateCombo.selectedItem;
        if (!item) {
          let place = groups.indexOf(el.id);
          (place > -1) ? groups.splice(place, 1) : groups.push(el.id);
          (place > -1) ? this.unSelectAllItems(el) : this.selectAllItems(el);
        } else {
          let newid = el.id + "_" + item.name;
          let place = items.indexOf(newid);
          (place > -1) ? items.splice(place, 1) : items.push(newid);
        }
      },
      unSelectAllItems(el) {
        this.stateCombo.selectedItem = this.stateCombo.selectedItem.filter(select => select.indexOf(el.id) !== 0);
      },
      selectAllItems(el) {
        this.groups.map(group => {
          group.id === el.id && group.content.map(q => {
            let newid = el.id + '_' + q.name;
            if (this.stateCombo.selectedItem.indexOf(newid) !== 0) this.stateCombo.selectedItem.push(newid);
          })
        });
      }
    }
  }
</script>

<style scoped>
  .combo {
    width: 360px;
    background: #FFFFFF;
    border-radius: 2px;

  }

  .combo img {
    cursor: pointer;
    position: relative;
    top: 6px;
  }

  .head {
    color: #304FFE;
    /*line-height: 16px;*/
    font-size: 14px;
    font-weight: 600;
    padding: 20px 26px;
    vertical-align: top;
  }

  .head span, .combo-item span {
    padding-left: 10px;
  }

  .combo-el {
    padding: 5px 0 0px;

  }

  .combo-el:hover {
    background: #f5f5f5;
  }

  .combo-el .img0 {
    padding-left: 28px;
  }

  .combo-item:hover {
    border: 1px solid red;
    margin: -1px;
  }

  .combo-item {
    padding: 7px 0px 12px;
  }

  .hr {
    height: 1px;
    width: 90%;
    background: #ddd;
    margin: 0 auto;
    margin-top: 15px
  }
</style>
