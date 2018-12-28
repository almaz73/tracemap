<template>
  <div v-if="!!this.getText" class="root-notification" @click="close()">
    <div class="txt">{{this.getText}}</div>
    <div class="close">X</div>
  </div>
</template>

<script>
  export default {
    name: "Notification",
    methods: {
      close: function () {
        this.$store.dispatch('setNotification', this.$store.getters.notifications[0]);
      }
    },
    updated() {
      if (this.$store.getters.notifications[0]) setTimeout(() => this.close(), 3000);
    },
    computed: {
      getText() {
        let note = this.$store.getters.notifications[0];
        return note;
      }
    }
  }
</script>

<style scoped>
  .root-notification {
    position: absolute;
    z-index: 10000;
    right: 3px;
    top: 7px;
    padding: 12px 25px 15px;
    background-color: rgba(254, 200, 89, 0.8);
    border-radius: 10px;
    border: 2px solid white;
    box-shadow: -3px 3px 15px black;
    cursor: pointer;
  }

  .txt {
    max-width: 300px;
    text-shadow: 0 0 5px white;;
  }

  .close {
    position: absolute;
    right: -3px;
    top: -7px;
    width: 40px;
    height: 40px;
    /*background: red;*/
    text-align: center;
    line-height: 40px;
    font-size: 10px;

  }

  .close:hover {
    color: red;
  }

</style>
