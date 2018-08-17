<template>
  <div class="root">
    <p v-for="(li, index) in Layers" :key="index">
      <input type="checkbox" name="a" value="li"> {{li}}
    </p>
  </div>
</template>

<script>
  export default {
    name: "cTool",
    data() {
      return {
        Layers: [
          "Районы",
          "Населенные пункты",
          "Дороги (улицы)",
          "Строения",
          "Водные объекты плош.",
          "Водные объекты лин.",
          "Растительность площ",
          "Просеки"
        ]
      }
    }
  }
</script>

<style scoped>
  .root {
    z-index: 10;
    position: absolute;
    top: 150px;
    left: 100px;
    background: white;
    min-height: 30px;
    box-shadow: 2px 2px 5px #999;
    font-size: 14px;
  }

  p:hover {
    background: #f5f5f5;
  }

  p {
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #f5f5f5;
  }
</style>
