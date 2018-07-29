<template>
  <div>
    <Frame/>
    <div class="links">
    <h1>Главная страница</h1>
      <nuxt-link to="/map"> Карта </nuxt-link>
      <nuxt-link to="/technologies"> Технологии </nuxt-link>
    </div>
  </div>

</template>

<script>
  import Frame from '~/components/Frame.vue'

  export default {
    components: {
      Frame
    }
  }
</script>

<style>
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
