<template>
  <div class="menuSearch">
    <div
      class="menu" :class="{opened: show}" @click="toShowTools()">{{show ? '+' : '...' }}
    </div>
    <input v-model="inputValue" :onchange="inputOnchange()" placeholder="search"/>
    <br>
    <div class="lines" :onclick="changedNewArea(place)" v-for="place in places" :key="place.y">{{place.label}}</div>
  </div>
</template>

<script>
  import {OpenStreetMapProvider} from 'leaflet-geosearch';

  export default {
    name: "PlusSearch",
    data() {
      return {
        show: true,
        provider: new OpenStreetMapProvider(),
        places:[],
        inputValue: ''
      }
    },
    methods: {
      toShowTools() {
        this.show = !this.show;
        this.$store.dispatch('setShowTool', this.show)
      },
      inputOnchange (){
        console.log('...... this.inputValue=', this.inputValue)

        this.provider.search({ query: this.inputValue})
          .then(
            res =>{
              this.places = res;
              console.log('...!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!... this.places=', this.places)
            },
            err => console.log('...... err=', err)
          )

        console.log('...... this.placesthis.placesthis.places=', this.places)
      },
      changedNewArea(place){
        console.log('...... place=', place)
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
    width: 292px;
    height: 24px;
    padding: 20px;
    border: none;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
  }

  .lines{
    background: white;
    padding: 5px;
    margin-top: 0px;
    box-shadow: 0 0 7px #999;
    border-radius: 4px;
    min-width: 375px;
    cursor: pointer;
  }
  .lines:hover{
    background: #f5f5f5;
  }

</style>
