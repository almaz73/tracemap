<template>
  <div>
    <Frame/>
    <div class="links">
      <h1>Главная страница</h1>
      <router-link to="/map"> Карта</router-link>
      <router-link to="/technologies"> Технологии</router-link>
    </div>
  </div>
</template>

<script>
  import Frame from '@/components/Frame';

  export default {
    name: 'Index',
    components: {
      Frame
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
