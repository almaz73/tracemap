<template>
  <div class="menuSearch">
    <div class="menu" :class="{opened: !show}" @click="toShowTools()">{{!show ? '+' : '...'}}</div>
    <input v-model="inputValue" @keyup="onKeyUp()" placeholder="поиск по адресу ..."/>
    <br>
    <div v-if="isShowPlaces" class="lines" @click="setPlace(place.guid)" v-for="place in places.data" :key="place.y">
      {{place.fullname}}
    </div>
  </div>
</template>

<script>
  import application from '../../assets/js/application';
  import * as axios from 'axios';
  import L from 'leaflet';

  export default {
    name: "PlusSearch",
    data() {
      return {
        places: [],
        inputValue: '',
        isShowPlaces: false,
      }
    },
    computed: {
      show() {
        return this.$store.getters.isShowTool
      }
    },
    methods: {
      toShowTools() {
        this.$store.dispatch('setShowTool', !this.$store.getters.isShowTool)
      },
      async onKeyUp() {
        this.isShowPlaces = true;
        this.places = await axios.get('/ambulance/places/search?contains=' + this.inputValue + '&local=true');
      },
      async setPlace(guid) {
        let place = await axios.get('/ambulance/places/coordinates/' + guid);
        application.map.setView([place.data.latitude, place.data.longitude], 14);
        this.isShowPlaces = false;
        // Добавим маркер
        let center = L.marker([place.data.latitude, place.data.longitude], {opacity: 0.5}).addTo(application.map);
        center.bindTooltip(place.data.sourceFullName).openTooltip();

        // через 3 сек убираем метку
        setTimeout(() => center.remove(), 5000);
      }
    }
  }
</script>

<style scoped>
  .menuSearch {
    z-index: 1000;
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .menu {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background: white;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
    text-align: center;
    line-height: 23px;
    font-size: 30px;
    cursor: pointer;
  }

  .menu.opened {
    line-height: 38px;
  }

  .menuSearch input {
    position: absolute;
    left: 50px;
    top: 0;
    background: #FFFFFF;
    border-radius: 3px;
    width: 270px;
    height: 24px;
    padding: 20px;
    border: none;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
  }

  .lines {
    background: white;
    padding: 5px;
    margin-top: 0px;
    box-shadow: 0 0 7px #999;
    border-radius: 4px;
    min-width: 375px;
    cursor: pointer;
  }

  .lines:hover {
    background: #f5f5f5;
  }

</style>
