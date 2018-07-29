<template>
  <div>
    <Header/>
    <Menu/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Menu from '../components/Menu'

  export default {
    name: "Frame",
    components: {
      Header,
      Menu
    }
  }
</script>
