<template>
  <div class="head">
    <a @click="openMenu()">Меню</a>
    <a @click="saveState()" v-if="isEditPage" title="сохранить состояние">
      <img src="../assets/buttons/save.png" height="20" width="20"/></a>
  </div>
</template>

<script>
  import localforage from 'localforage';

  export default {
    name: 'Header',
    methods: {
      openMenu: function() {
        this.$store.dispatch('setIsMenu', !this.$store.getters.isMenu);
      },
      saveState: function() {
        let tmpState = {};

        for (let name in this.$store.state) {
          if (this.$store.state.hasOwnProperty(name)) {
            tmpState[name] = this.$store.state[name];
          }
        }

        localforage.setItem('state', tmpState)
      }
    },
    computed: {
      isEditPage: function() {
        return location.hash.indexOf('edit') > -1
      }
    }
  };
</script>

<style scoped>
  .head {
    height: 50px;
    width: 100%;
    background: black;
    color: white;
    line-height: 50px;
    /*padding-left: 10px;*/
  }

  .head a {
    cursor: pointer;
    padding: 10px;
    margin-left: 10px;
  }

  .head a:hover {
    background: #47494e;
    border-radius: 5px;
    color: blanchedalmond;
  }

  .head img {
    position: relative;
    top: 4px;
    height: 20px;
    width: 20px;
  }
</style>
