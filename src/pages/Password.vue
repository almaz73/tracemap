<template>
  <div class="root">
    <div class="active-fon"></div>
    <Notification/>
    <div class="autoriz">
      <h3>Авторизация</h3>
      <div class="autoriz-icon">
        <img src="../assets/images/systemL.png" height="82" width="84"/>
      </div>

      <div class="alert-danger" v-if="isErr">
        Пара логин-пароль не соответствует ни одному пользователю
      </div>

      <label>Логин</label>
      <form>
        <p><input autocomplete="off" ref="login" type="text" placeholder="Введите логин"></p>
        <p><input autocomplete="off" ref="password" :type="isShowPassword?'text':'password'" placeholder="Пароль">
          <img @click="isShowPassword=!isShowPassword" class="autoriz-eye" src="../assets/images/autoriz/eye.png"/>
        </p>
        <button @click.stop.prevent="onSubmit()">ВХОД</button>
      </form>
    </div>
  </div>
</template>

<script>
  import * as axios from 'axios';
  import Notification from "../components/Notification";

  export default {
    name: 'Password',
    components: {Notification},
    data() {
      return {
        isShowPassword: false,
        isErr: false
      }
    },
    methods: {
      async onSubmit() {
        let username = this.$refs.login.value;
        let password = this.$refs.password.value;
        let obj = `username=${username}&password=${password}`;

        this.$root.username = username;

        await axios.post('/ambulance/login', obj)
          .then(
            resp => {
              this.$router.push({path: '/'});
              this.isErr = false;
            },
            err => {
              if (err.response.status !== 401) this.$store.dispatch('setNotification', err.message);
              this.isErr = true;
            }
          );
      }
    }
  };
</script>
<style>

  .alert-danger {
    background-color: #f2dede;
    border-color: #ebccd1;
    color: #a94442;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 20px;
  }

  .active-fon {
    position: absolute;
    background: url("../assets/images/autoriz/fonMap.jpg");
    opacity: 0.2;
    width: 100%;
    height: 100vh
  }

  .root {
    height: 100vh;
    align-items: center;
  }

  .autoriz h3 {
    top: 0;
    position: relative;
    padding: 15px 25px 15px 25px;
    margin: -35px;
    background-color: #d2d6db;
    color: #555;
    border: 1px solid #fff;
    margin-bottom: 50px;
  }

  .autoriz {
    top: calc(10%);
    position: relative;
    margin: auto;
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
    top: -42px;
    left: calc(73%);
  }

  .autoriz-icon img {
    margin-top: 28px;
  }

  .autoriz label {
    line-height: 0px;
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
