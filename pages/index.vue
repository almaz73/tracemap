<template>
  <section class="container">
    <Header/>
    <Menu/>
    <div>
      <h1 class="title">
        Tracemap
      </h1>
      <div class="links">
        <nuxt-link to="/example1">Map</nuxt-link>
        <nuxt-link to="/technologies">Help</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
  import Header from '../components/Header'
  import Menu from '../components/Menu'

  export default {
    name: "Index",
    components: {
      Header,
      Menu
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
