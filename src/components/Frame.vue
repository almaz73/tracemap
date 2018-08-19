<template>
  <div>
    <Header/>
    <Menu/>
    <Alert v-if="~~without.indexOf('Alert')"/>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import Menu from '@/components/Menu';
  import Alert from '@/components/Alert';

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
