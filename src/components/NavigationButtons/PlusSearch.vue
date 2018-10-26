<template>
  <div class="menuSearch">
    <div
      class="menu" :class="{opened: show}" @click="toShowTools()">{{show ? '+' : '...' }}
    </div>
    <input placeholder="search"/>

  </div>
</template>

<script>
  export default {
    name: "PlusSearch",
    data() {
      return {
        show: true
      }
    },
    methods: {
      toShowTools() {
        this.show = !this.show;
        this.$store.dispatch('setShowTool', this.show)
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
    padding: 8px;
    border: none;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.18);
  }

</style>
