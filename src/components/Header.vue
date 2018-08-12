<template>
  <div class="head">
    <a @click="openMenu()">Меню</a>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    methods: {
      openMenu: function() {
        this.$store.dispatch('setIsMenu', !this.$store.getters.isMenu);
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
</style>
