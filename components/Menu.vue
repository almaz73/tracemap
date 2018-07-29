<template>
  <div class="menu" :class="{open: isMenu}">
    <nuxt-link to="/">Главная</nuxt-link>
    <nuxt-link to="/technologies">Технологии</nuxt-link>
  </div>
</template>

<script>
  import Vuex from 'vuex';

  export default {
    name: "Menu",
    computed: {
      isMenu: function () {
        return this.$store.getters.isMenu
      }
    }
  }
</script>

<style scoped>
  .menu {
    background: #47494e;
    width: 300px;
    height: calc(100vh - 50px);
    position: absolute;
    padding: 20px 0;
    color: white;
    left: -300px;
    -webkit-transition: left 0.3s,
    transform 0.3s;
  }

  .menu.open {
    left: 0px;
  }

  a {
    color: white;
    text-decoration: none;
    display: block;
    padding: 10px 20px;
  }

  a:hover {
    background: #7f828b;
    color: blanchedalmond;
  }
</style>
