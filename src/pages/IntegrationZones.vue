<template>
  <div>
    <Wait v-if="wait"/>
  </div>
</template>
<script>
  import * as axios from 'axios';
  import L from 'leaflet';
  import application from '../assets/js/application';
  import Wait from "../components/Wait";

  let cash = {};

  export default {
    name: "IntegrationZones",
    components: {Wait},
    data() {
      return {
        geoJsons: {},
        wait: false
      }
    },
    methods: {
      async getLayers() {
        const req = await axios.get('/ambulance/gis/layers');
        this.$emit('setLayer', req.data);

        // JSON.stringify(req.data)
        // [{"id":1,"startDate":"1901-01-01T00:00:00.000","name":"Медицинские учреждения","orderNum":1,"code":"1","description":"Медицинские учреждения","children":[{"id":2,"startDate":"1901-01-01T00:00:00.000","name":"Стационар","orderNum":2,"code":"2","description":"Стационар","parentId":1,"children":[{"id":12,"startDate":"1901-01-01T00:00:00.000","name":"Отделение стационара","orderNum":12,"code":"12","description":"Отделение стационара","parentId":2,"children":[]}]},{"id":3,"startDate":"1901-01-01T00:00:00.000","name":"Травмпункт","orderNum":3,"code":"3","description":"Травмпункт","parentId":1,"children":[]},{"id":4,"startDate":"1901-01-01T00:00:00.000","name":"Диспансер","orderNum":4,"code":"4","description":"Диспансер","parentId":1,"children":[]},{"id":5,"startDate":"1901-01-01T00:00:00.000","name":"Вытрезвитель","orderNum":5,"code":"5","description":"Вытрезвитель","parentId":1,"children":[]},{"id":6,"startDate":"1901-01-01T00:00:00.000","name":"Поликлиника","orderNum":6,"code":"6","description":"Поликлиника","parentId":1,"children":[{"id":7,"startDate":"1901-01-01T00:00:00.000","name":"Поликлиника детская","orderNum":7,"code":"7","description":"Поликлиника детская","parentId":6,"children":[{"id":13,"startDate":"1901-01-01T00:00:00.000","name":"Участок детской поликлиники","orderNum":13,"code":"13","description":"Участок детской поликлиники","parentId":7,"children":[]}]},{"id":8,"startDate":"1901-01-01T00:00:00.000","name":"Поликлиника взрослая","orderNum":8,"code":"8","description":"Поликлиника взрослая","parentId":6,"children":[{"id":14,"startDate":"1901-01-01T00:00:00.000","name":"Участок взрослой поликлиники","orderNum":14,"code":"14","description":"Участок взрослой поликлиники","parentId":8,"children":[]}]},{"id":9,"startDate":"1901-01-01T00:00:00.000","name":"Поликлиника студенческая","orderNum":9,"code":"9","description":"Поликлиника студенческая","parentId":6,"children":[]},{"id":15,"startDate":"1901-01-01T00:00:00.000","name":"Участок поликлиники","orderNum":15,"code":"15","description":"Участок поликлиники","parentId":6,"children":[]}]},{"id":10,"startDate":"1901-01-01T00:00:00.000","name":"Подстанция СМП","orderNum":10,"code":"10","description":"Подстанция СМП","parentId":1,"children":[]},{"id":11,"startDate":"1901-01-01T00:00:00.000","name":"Санэпидстанции","orderNum":11,"code":"11","description":"Санэпидстанции","parentId":1,"children":[]},{"id":38,"startDate":"1901-01-01T00:00:00.000","name":"Морг","orderNum":22,"code":"22","description":"Морг","parentId":1,"children":[]},{"id":37,"startDate":"2018-02-20T16:30:02.181","name":"Медпункт","parentId":1,"children":[]}]},{"id":23,"startDate":"2008-12-31T00:21:56.093","name":"Общественное место","orderNum":16,"code":"16","description":"Общественное место","children":[]},{"id":39,"startDate":"1901-01-01T00:00:00.000","name":"Образовательные учреждения","orderNum":17,"code":"17","description":"Образовательные учреждения","children":[]},{"id":27,"startDate":"2008-12-31T00:21:56.000","name":"Школа","orderNum":18,"code":"18","description":"Школа","children":[]},{"id":40,"startDate":"1901-01-01T00:00:00.000","name":"Дошкольное учреждение","orderNum":19,"code":"19","description":"Дошкольное учреждение","children":[]},{"id":22,"startDate":"2008-12-31T00:21:56.093","name":"Улица","orderNum":20,"code":"20","description":"Улица","children":[]},{"id":21,"startDate":"2008-12-31T00:21:56.093","name":"квартира","orderNum":21,"children":[]},{"id":36,"startDate":"2013-01-01T00:00:00.000","name":"Федеральная автомобильная трасса","orderNum":21,"code":"21","description":"Федеральная автомобильная трасса","children":[]},{"id":41,"startDate":"1901-01-01T00:00:00.000","name":"Пункт приема пищи","orderNum":23,"code":"23","description":"Пункт приема пищи","children":[]},{"id":42,"startDate":"1901-01-01T00:00:00.000","name":"АЗС","orderNum":24,"code":"24","description":"АЗС","children":[]},{"id":25,"startDate":"2008-12-31T00:21:56.093","name":"рабочее место","orderNum":25,"children":[]},{"id":26,"startDate":"2008-12-31T00:21:56.093","name":"подстанция","orderNum":26,"children":[]},{"id":29,"startDate":"2008-12-31T00:21:56.093","name":"прочее","orderNum":29,"children":[]}]
      },
      async getObjects(id) {
        let bounds = application.map.getBounds();
        let Nlat = bounds._northEast.lat;
        let Nlng = bounds._northEast.lng;
        let Slat = bounds._southWest.lat;
        let Slng = bounds._southWest.lng;
        let link = `/ambulance/gis/objects?layerIds=${id}&minLat=${Nlat}&minLon=${Nlng}&maxLat=${Slat}&maxLon=${Slng}`;
        let req = null;

        this.wait = true;

        if (cash[link]) req = cash[link];
        else req = await axios.get(link);
        cash[link] = req;

        this.wait = false;
        this.showObjects(id, req.data)

        // axios.get(`/ambulance/gis/objects?layerIds=${id}&minLat=${Nlat}&minLon=${Nlng}&maxLat=${Slat}&maxLon=${Slng}`)
        //   .then(
        //     resp => this.showObjects(id, resp.data),
        //     () => this.showObjects(null, [])
        //   );
      },
      showObjects: function (id, data) {
        data.map(el => {
          let name = id + "|" + el.name;
          this.geoJsons[name] = L.geoJSON(JSON.parse(el.geomControl));
          application.map.addLayer(this.geoJsons[name]);
        });
        this.wait = false;
      },
      hideObject: function (id) {
        Object.keys(this.geoJsons).map(el => {
          if (parseInt(el) === id) application.map.removeLayer(this.geoJsons[el])
        });
      }
    },
    mounted() {
      this.getLayers();
      this.$root.$on('selectedLayer', (id, bool) => {
        if (bool) this.getObjects(id);
        else this.hideObject(id);
      });
    }
  }
</script>
