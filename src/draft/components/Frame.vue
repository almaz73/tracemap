<template>
  <div>
    <Header/>
    <Menu/>
    <Alert v-if="~~without.indexOf('Alert')"/>
  </div>
</template>

<script>
  import Header from './Header';
  import Menu from './Menu';
  import Alert from './Alert';

  export default {
    name: 'Frame',
    components: {
      Header,
      Menu,
      Alert
    },
    props: {
      without: {
        type: Array,
        default: () => []
      }
    }
  };
</script>
