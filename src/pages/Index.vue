<template>
  <div style="background: #aaaaaa; height: 100vh">
    <Frame/>
    <div class="links">
      <h1>Главная страница</h1>
      <router-link to="/map"> Карта</router-link>
      <router-link to="/technologies"> Технологии</router-link>
      <br>
      <br>
      <CCombobox/>
    </div>
  </div>
</template>

<script>
  import Frame from '@/components/Frame';
  import CCombobox from '../components/CCombobox'

  export default {
    name: 'Index',
    components: {
      Frame,
      CCombobox
    }
  };
</script>

<style scoped>
  .links {
    margin: 12px;
  }

  .links a {
    padding: 3px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 5px;
    background: #dbe1ec;
    text-decoration: none;
  }

  .links a:hover {
    background: aliceblue;
  }
</style>
