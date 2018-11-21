<template>
  <div class="menuSearch">
    <div class="menu" :class="{opened: show}" @click="toShowTools()">{{show ? '+' : '...'}}</div>
    <input v-model="inputValue" @keyup="onKeyUp()" placeholder="search"/>
    <br>
    <div v-if="isShowPlaces" class="lines" @click="changedNewArea(place)" v-for="place in places" :key="place.y">
      {{place.label}}
    </div>
  </div>
</template>

<script>
  import {OpenStreetMapProvider} from 'leaflet-geosearch';
  import application from '../../assets/js/application';

  export default {
    name: "PlusSearch",
    data() {
      return {
        show: true,
        provider: new OpenStreetMapProvider(),
        places: [],
        inputValue: '',
        isShowPlaces: false,
        provider: new OpenStreetMapProvider()
      }
    },
    methods: {
      toShowTools() {
        this.show = !this.show;
        this.$store.dispatch('setShowTool', this.show)
      },
      onKeyUp() {
        this.provider.search({query: this.inputValue})
          .then(
            res => {
              this.places = res;
              this.isShowPlaces = true
            },
            err => console.error('...... err=', err)
          );
      },
      changedNewArea(place) {
        application.map.setView([place.x, place.y], 1);
        application.map.fitBounds(place.bounds); // граница для масштабирования по массиву
        this.isShowPlaces = false;
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
    width: 305px;
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
