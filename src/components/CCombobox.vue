<template>
  <div class="combo">
    <div class="head">
      <img src="../assets/images/combobox/plus_white.png"/>
      <span>ДОБАВИТЬ ТС</span>
      <br/>
      <img src="../assets/images/combobox/plus.png"/>
      <span>ДОБАВИТЬ ГРУППУ </span>
    </div>
    <div class="combo-el" v-for="el in groups" :key="el.id">

      <img v-if="~stateCombo.selected.indexOf(el.id)" src="../assets/images/combobox/on.png"/>
      <img v-else src="../assets/images/combobox/off.png"/>

      <img v-if="~stateCombo.opened.indexOf(el.id)" src="../assets/images/combobox/arrow-down.png"/>
      <img v-else src="../assets/images/combobox/arrow-right.png"/>


      <span>
        {{el.name}} {{el.content? "("+el.content.length+")":""}}
      </span>
      <!--<hr color="#ddd" size="1" width="90%" style="margin: 15px auto 0" />-->
      <div style="height: 1px; width: 90%; background: #ddd; margin: 0 auto; margin-top: 15px"></div>
      <div class="combo-el-sub" v-if="~stateCombo.opened.indexOf(el.id)" v-for="(item, index) in el.content"
           :key="index">
        <img v-if="~stateCombo.selected.indexOf(el.id+'_'+index)" src="../assets/images/combobox/on.png"/>
        <img v-else src="../assets/images/combobox/off.png"/>
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
          selected: [1, 2, 3, 4, 7]
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
              stoped: true,
              alarm: false
            }, {
              name: "Авто 7",
              stoped: true,
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
    // computed: {
    //   isOpen
    // },
    mounted() {

      // window.DDD = this.stateCombo

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
    top:6px;
  }

  .head {
    color: #304FFE;
    /*line-height: 16px;*/
    font-size: 14px;
    font-weight: 600;
    padding: 20px 26px;
    vertical-align: top;
  }
  .head span{
    padding: 15px 0;
  }

  .combo-el {
    /*margin: 5px 0;*/
    /*line-height: 30px;*/
    /*padding-bottom: 10px;*/
    padding: 5px 0 0px;


  }

  .combo-el:hover {
    background: #f5f5f5;
  }

  /*.combo-el img {*/
    /*position: relative;*/
    /*top:6px;*/
  /*}*/

  .combo-el span, .combo-el-sub span {
    /*vertical-align: top;*/
  }

  .combo-el-sub:hover {
    border: 1px solid red;
    margin: -1px;
  }

  .combo-el-sub {
    padding: 12px 0px;
  }

</style>
