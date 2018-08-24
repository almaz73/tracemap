<template>
  <div>
    <Frame :without="['Alert']"/>
    <div class="active-fon"></div>
    <div class="autoriz">
      <div class="autoriz-icon">
        <img src="../assets/images/autoriz/logo.png"/>
      </div>
      <h3>ВХОД В СИСТЕМУ</h3>
      <label>Логин</label>
      <form>
        <p><input type="text" placeholder="Введите логин"></p>
        <p><input :type="isShowPassword?'text':'password'" placeholder="Пароль">
          <img @click="isShowPassword=!isShowPassword" class="autoriz-eye" src="../assets/images/autoriz/eye.png"/>
        </p>
        <!-- событие submit не будет перезагружать страницу (prevent)-->
        <button  @click.stop.prevent="onSubmit()">ВХОД</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Frame from "../components/Frame";

  export default {
    name: 'Admin',
    components: {Frame},
    data() {
      return {
        isShowPassword: false
      }
    },
    methods: {
      onSubmit: function () {
        alert()
      }
    }
  };
</script>
<style>
  .active-fon {
    position: absolute;
    background-image: url("../assets/images/autoriz/fonMap.jpg");
    opacity: 0.2;
    width: 100%;
    height: calc(100vh - 60px);
  }

  .autoriz {
    position: relative;
    margin: auto;
    margin-top: 200px;

    width: 398px;
    height: 411px;

    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.18);
    border-radius: 3px;
    padding: 36px;
  }

  .autoriz-icon {
    position: absolute;
    width: 90px;
    height: 90px;
    top: -45px;
    text-align: center;
    left: calc(50% - 45px);

    background: #FFFFFF;
    border: 1px solid rgba(96, 125, 139, 0.32);
    box-sizing: border-box;
    border-radius: 99px;
  }

  .autoriz-icon img {
    margin-top: 28px;
  }

  .autoriz H3 {
    font-size: 14px;
    margin: 80px 0 20px;
  }

  .autoriz label {
    line-height: 16px;
    font-size: 12px;
    color: #304FFE;
    position: absolute;
    margin: 10px 0 5px 0;
    z-index: 1;
  }

  .autoriz input {
    margin-top: 18px;
    line-height: 24px;
    font-size: 16px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9e9e9e;
    padding: 8px 0;
    outline: none;

  }

  .autoriz input:hover {
    border-bottom: 2px solid #304FFE;
  }

  .autoriz button {
    margin-top: 20px;
    background: #304FFE;
    border-radius: 3px;
    border: none;
    width: 100%;
    height: 40px;
    color: white;
    cursor: pointer;
  }

  .autoriz p {
    position: relative;
  }

  .autoriz-eye {
    position: absolute;
    right: 0px;
    top: 20px;
    padding: 7px;
    cursor: pointer;
  }

  .autoriz-eye:hover {
    background: #eee;
  }
</style>
