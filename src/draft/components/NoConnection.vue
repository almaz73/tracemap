<template>
  <div class="no-connection">
    <div class="panel">
      <h4>Соединение прервано</h4>
      Интернет соединение было прервано.
      Сигнал отсутствует ...
      <br><br>
      <a href="#">Возобновить</a> &nbsp; &nbsp; &nbsp;
      <a href="#">Отмена</a>
    </div>
    <div class="active-fon"></div>
  </div>
</template>

<script>
  export default {
    name: "NoConnection"
  }
</script>

<style scoped>
  .no-connection {
    z-index: 100000;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active-fon {
    position: absolute;
    background-color: black;
    opacity: 0.2;
    width: 100%;
    height: calc(100vh);

  }

  .panel {

    z-index: 1;

    width: 368px;
    height: 214px;

    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.18);
    border-radius: 3px;
    padding: 14px 36px;
  }
</style>
