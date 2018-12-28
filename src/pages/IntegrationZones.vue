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
        wait: false,
        trapLinks: [] // собираем для общего запроса
      }
    },
    methods: {
      async getLayers() {
        const req = await axios.get('/ambulance/gis/layers');
        this.$emit('setLayer', req.data);
      },

      async getObjects(ids) {
        if (!ids.length) return;
        let layerIdsAll = '';
        ids.forEach(id => layerIdsAll += '&layerIds=' + id);
        let bounds = application.map.getBounds();
        let Nlat = bounds._northEast.lat;
        let Nlng = bounds._northEast.lng;
        let Slat = bounds._southWest.lat;
        let Slng = bounds._southWest.lng;
        let link = `/ambulance/gis/objects?minLat=${Slat}&minLon=${Slng}&maxLat=${Nlat}&maxLon=${Nlng}` + layerIdsAll;
        let req = null;

        if (cash[link]) req = cash[link];
        else req = await axios.get(link);
        cash[link] = req;

        this.hideObject([...this.trapLinks]); // очистим передс ставкой новых
        this.showObjects(req.data);
      },
      showObjects: function (data) {
        data.map(el => {
          let name = el.layerId + "|" + el.name;
          this.geoJsons[name] = L.geoJSON(JSON.parse(el.geomControl));
          application.map.addLayer(this.geoJsons[name]);
        });
      },
      hideObject: function (ids) {
        Object.keys(this.geoJsons).map(el => {
          if (ids.includes(parseInt(el))) application.map.removeLayer(this.geoJsons[el])
        });
      },
      getTrapLinks(id, bool) {
        switch (id) {
          case 'begin':
            this.trapLinks = [];
            break;
          case 'end':
            if (bool) this.getObjects([...this.trapLinks]);
            else this.hideObject([...this.trapLinks]);
            break;
          default :
            this.trapLinks.push(id);
        }
      }
    },
    mounted() {
      let that = this;
      this.getLayers();
      this.$root.$on('selectedLayer', (id, bool) => {
        this.getTrapLinks(id, bool);
      });

      application.map.on('moveend', function () {
        // после перемещения карты обновляем данные открытых слоев
        let links = that.$store.state.editLayers;
        that.trapLinks = [];
        links.forEach(link => {
          if (typeof link === 'number') that.trapLinks.push(link);
        });
        that.getObjects([...that.trapLinks]);
      });
    }
  }
</script>
