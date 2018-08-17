<template>
  <div>
    <Header/>
    <Menu/>
    <Alert/>
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
    }
  };
</script>
