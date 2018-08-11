<template>
  <div class="menu" :class="{open: isMenu}" @click="closeWindow()">
    <router-link to="/">Главная</router-link>
    <router-link to="/technologies">Технологии</router-link>
    <div class="inline"><router-link to="/map">Карта</router-link>   <router-link to="/map2">Карта2</router-link>    </div>
    <router-link to="/admin">Админка</router-link>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  computed: {
    isMenu: function() {
      return this.$store.getters.isMenu;
    }
  },
  methods: {
    closeWindow: function() {
      this.$store.dispatch('setIsMenu', !this.$store.getters.isMenu);
    }
  }
};
</script>

<style scoped>
  .inline a {
    display: inline-block;
  }
  .menu {
    background: #47494e;
    width: 300px;
    height: calc(100vh - 90px);
    position: absolute;
    padding: 20px 0;
    color: white;
    left: -300px;
    -webkit-transition: left 0.3s,
    transform 0.3s;
    z-index: 10;
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
