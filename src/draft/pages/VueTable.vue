<template>
  <div style="margin: 10px">

    <div style="width: 100%; overflow-y: auto">
      <table class="vue-table" style="white-space: nowrap">
        <tbody>
        <tr>
          <th>Сотрудники</th>
          <th v-for="item in daysInMonth" :key="item"
              style="border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5; min-width: 45px">{{item}}
          </th>
          <th>Наличие прогонов</th>
        </tr><!-- Table Header -->

        <tr v-for="(el, index) in data0" :key="index">
          <td rowspan="2" v-if="index/2 == parseInt(index/2)">{{el.staffName}}</td>

          <td v-for="item in daysInMonth" :key="item">{{item}}</td>
          <td>{{el.sum}}</td>
        </tr><!-- Table Row -->

        </tbody>
      </table>

    </div>

  </div>
</template>

<script>
  export default {
    name: "VueTable",
    data() {
      return {
        data0: [
          {staffName: 'Иванов Иван Иванович1', days: [1, 2, 12], sum: ' Итог 12'},
          {staffName: 'Петров Петр Михайлович2', days: [5, 7, 8], sum: ' Итог 188'},
          {staffName: 'Иванов Иван Иванович3', days: [1, 2, 12], sum: ' Итог 12'},
          {staffName: 'Петров Петр Михайлович4', days: [5, 7, 8], sum: ' Итог 188'}
        ],
        data: [{
          "BaseDTO{id=4650}": {
            "allNightHoursMain": 0.0,
            "allNightHoursConc": 2.0,
            "allHoursMain": 0.0,
            "allHoursConc": 48.0,
            "dailyInfo": [{
              "day": "2018-10-01",
              "dayHours": 30.0,
              "nightHours": 4.0,
              "basic": false,
              "timeMark": {
                "id": 1,
                "startDate": "1901-01-01T00:00:00.000",
                "name": "Я",
                "orderNum": 1.0,
                "code": "01",
                "description": "Продолжительность работы в дневное время"
              },
              "timesheetDTO": {
                "start": "2018-10-01T07:00:00.000",
                "end": "2018-10-02T07:00:00.000",
                "staffPostDTO": {
                  "id": 4650,
                  "shortFio": "Быстрая Помощь Г 010023",
                  "fullName": "Быстрая Помощь Гурьевск 010023",
                  "stationId": 54,
                  "stationName": "ССМП г. Калининград",
                  "isDriver": false,
                  "post": {
                    "id": 47,
                    "startDate": "2006-09-01T14:29:20.000",
                    "name": "Фельдшер-статистик",
                    "orderNum": 23.0,
                    "code": "23",
                    "description": "Статист."
                  },
                  "employee": {
                    "id": 2839,
                    "name": "Гурьевск",
                    "surname": "Быстрая Помощь",
                    "fullName": "Быстрая Помощь Гурьевск",
                    "shortName": "Быстрая Помощь Г"
                  },
                  "driver": false,
                  "main": true
                }
              },
              "hoursSum": 34.0
            }, {
              "day": "2018-10-02",
              "dayHours": 2.0,
              "nightHours": 12.0,
              "basic": false,
              "timeMark": {
                "id": 2,
                "startDate": "1901-01-01T00:00:00.000",
                "name": "Н",
                "orderNum": 2.0,
                "code": "02",
                "description": "Продолжительность работы в ночное время"
              },
              "timesheetDTO": {
                "start": "2018-10-01T07:00:00.000",
                "end": "2018-10-02T07:00:00.000",
                "staffPostDTO": {
                  "id": 4650,
                  "shortFio": "Быстрая Помощь Г 010023",
                  "fullName": "Быстрая Помощь Гурьевск 010023",
                  "stationId": 54,
                  "stationName": "ССМП г. Калининград",
                  "isDriver": false,
                  "post": {
                    "id": 47,
                    "startDate": "2006-09-01T14:29:20.000",
                    "name": "Фельдшер-статистик",
                    "orderNum": 23.0,
                    "code": "23",
                    "description": "Статист."
                  },
                  "employee": {
                    "id": 2839,
                    "name": "Гурьевск",
                    "surname": "Быстрая Помощь",
                    "fullName": "Быстрая Помощь Гурьевск",
                    "shortName": "Быстрая Помощь Г"
                  },
                  "driver": false,
                  "main": true
                }
              },
              "hoursSum": 14.0
            }],
            "dataForChange": [{
              "start": "2018-10-01T07:00:00.000",
              "end": "2018-10-02T07:00:00.000",
              "staffPostDTO": {
                "id": 4650,
                "shortFio": "Быстрая Помощь Г 010023",
                "fullName": "Быстрая Помощь Гурьевск 010023",
                "stationId": 54,
                "stationName": "ССМП г. Калининград",
                "isDriver": false,
                "post": {
                  "id": 47,
                  "startDate": "2006-09-01T14:29:20.000",
                  "name": "Фельдшер-статистик",
                  "orderNum": 23.0,
                  "code": "23",
                  "description": "Статист."
                },
                "employee": {
                  "id": 2839,
                  "name": "Гурьевск",
                  "surname": "Быстрая Помощь",
                  "fullName": "Быстрая Помощь Гурьевск",
                  "shortName": "Быстрая Помощь Г"
                },
                "driver": false,
                "main": true
              }
            }, {
              "start": "2018-10-01T07:00:00.000",
              "end": "2018-10-02T07:00:00.000",
              "staffPostDTO": {
                "id": 4650,
                "shortFio": "Быстрая Помощь Г 010023",
                "fullName": "Быстрая Помощь Гурьевск 010023",
                "stationId": 54,
                "stationName": "ССМП г. Калининград",
                "isDriver": false,
                "post": {
                  "id": 47,
                  "startDate": "2006-09-01T14:29:20.000",
                  "name": "Фельдшер-статистик",
                  "orderNum": 23.0,
                  "code": "23",
                  "description": "Статист."
                },
                "employee": {
                  "id": 2839,
                  "name": "Гурьевск",
                  "surname": "Быстрая Помощь",
                  "fullName": "Быстрая Помощь Гурьевск",
                  "shortName": "Быстрая Помощь Г"
                },
                "driver": false,
                "main": true
              }
            }]
          }
        }]

      }
    },
    computed: {
      daysInMonth: function () {
        let days = (33 - new Date(new Date().getFullYear(), new Date().getMonth(), 33).getDate())
        return [0, ...Array.from(Array(days).keys(), x => x + 1)].pop()
      }
    },
    // methods: {
    //   getDaysInMonth: function () {
    //     let days = (33 - new Date(new Date().getFullYear(), new Date().getMonth(), 33).getDate())
    //     return
    //   }
    // },
    mounted() {
      console.log("...222... daysInMonth=", this.daysInMonth)
    }
  }
</script>

<style scoped>
  .vue-table {
    font-family: Arial, Helvetica, sans-serif;
    color: #666;
    font-size: 12px;
    text-shadow: 1px 1px 0px #fff;
    background: #eaebec;
    margin: 0;
    border: #ccc 1px solid;
    border-collapse: separate;

    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;

    -moz-box-shadow: 0 1px 2px #d1d1d1;
    -webkit-box-shadow: 0 1px 2px #d1d1d1;
    box-shadow: 0 1px 2px #d1d1d1;
    border-spacing: 0;
    width: 100%;
  }

  .vue-table th {
    font-weight: bold;
    padding: 11px 15px 12px 15px;
    border-top: 1px solid #fafafa;
    border-bottom: 1px solid #e0e0e0;

    background: #ededed;
    background: -webkit-gradient(linear, left top, left bottom, from(#ededed), to(#ebebeb));
    background: -moz-linear-gradient(top, #ededed, #ebebeb);
  }

  .vue-table th:first-child {
    text-align: left;
    padding-left: 20px;
  }

  .vue-table tr:first-child th:first-child {
    -moz-border-radius-topleft: 3px;
    -webkit-border-top-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  .vue-table tr:first-child th:last-child {
    -moz-border-radius-topright: 3px;
    -webkit-border-top-right-radius: 3px;
    border-top-right-radius: 3px;
  }

  .vue-table tr {
    text-align: center;
    padding-left: 20px;
  }

  .vue-table tr td:first-child {
    text-align: left;
    padding-left: 20px;
    border-left: 0;
  }

  .vue-table tr td {
    padding: 8px;
    border-top: 1px solid #ffffff;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;

    background: #fafafa;
    background: -webkit-gradient(linear, left top, left bottom, from(#fbfbfb), to(#fafafa));
    background: -moz-linear-gradient(top, #fbfbfb, #fafafa);
  }

  .vue-table tr:nth-child(even) td {
    background: #f6f6f6;
    background: -webkit-gradient(linear, left top, left bottom, from(#f8f8f8), to(#f6f6f6));
    background: -moz-linear-gradient(top, #f8f8f8, #f6f6f6);
  }

  .vue-table tr:last-child td {
    border-bottom: 0;
  }

  .vue-table tr:last-child td:first-child {
    -moz-border-radius-bottomleft: 3px;
    -webkit-border-bottom-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .vue-table tr:last-child td:last-child {
    -moz-border-radius-bottomright: 3px;
    -webkit-border-bottom-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .vue-table tr:hover td {
    background: #f2f2f2;
    background: -webkit-gradient(linear, left top, left bottom, from(#f2f2f2), to(#f0f0f0));
    background: -moz-linear-gradient(top, #f2f2f2, #f0f0f0);
  }

  .vue-table a:link {
    color: #666;
    font-weight: bold;
    text-decoration: none;
  }

  .vue-table a:visited {
    color: #999999;
    font-weight: bold;
    text-decoration: none;
  }

  .vue-table a:active,
  .vue-table a:hover {
    color: #bd5a35;
    text-decoration: underline;
  }
</style>
