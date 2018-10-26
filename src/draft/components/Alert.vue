<template>
  <div class="draggable" v-if="alarms.length" ref="me">
    <div class="draggable-head">Оповещения
      <div class="draggable-head-x">_</div>
    </div>
    <div class="draggable-content" v-if="!isSmall">
      <div class="draggable-elem" v-for="elem in alarms" :key="elem.id">{{elem.id}}. {{elem.name}}
        <span class="draggable-elem-x" @click="deleteElem(elem)">x</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    data() {
      return {
        isSmall: false
      };
    },
    computed: {
      alarms: function() {
        if (!this.$store.state.alarms.length) return 'чтобы просто было видно панеля сообщений'
        return this.$store.state.alarms;
      }
    },
    created() {
      this.moveAlarms = function() {
        let elem = this.$refs.me;

        if (!elem) return;

        elem.onmousedown = e => {
          let coords = this.getCoords(elem);
          let shiftX = e.pageX - coords.left;
          let shiftY = e.pageY - coords.top;

          if (e.target.className === 'draggable-head-x') this.toCling();

          // список элементов, на которых перетаскивание отключается
          if (['draggable-head-x', 'draggable-elem-x'].includes(e.target.className)) return e.stopPropagation();

          moveAt(e);

          function moveAt(e) {
            elem.style.left = e.pageX - shiftX + 'px';
            elem.style.top = e.pageY - shiftY + 'px';
          }

          document.onmousemove = e => moveAt(e);

          elem.onmouseup = () => {
            document.onmousemove = null;
            elem.onmouseup = null;
          };
        };

        elem.ondragstart = () => false;
      };
    },
    methods: {
      deleteElem(elem) {
        let alarms = this.alarms.filter(el => el.id !== elem.id);
        this.$store.dispatch('setAlarms', alarms);
      },
      toCling() { // прилипание/отображение
        let elem = this.$refs.me;
        let coords = this.getCoords(elem);
        if (!this.isSmall) elem.style.top = (window.innerHeight - 30) + 'px';
        else if (coords.top > (window.innerHeight - 275)) elem.style.top = (window.innerHeight - 275) + 'px';
        this.isSmall = !this.isSmall;
      },
      getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
      }
    },
    mounted() {
      let waitPanel = () => {
        if (this.$refs.me) {
          this.$refs.me.style.opacity = 1;
          this.toCling();
        } else setTimeout(() => waitPanel(), 1);
      };
      waitPanel();
    },
    updated() {
      this.moveAlarms();
    }
  };
</script>

<style>
  :root {
    --radius: 8px;
  }

  .draggable-head, .draggable {
    border-radius: var(--radius) var(--radius) 0 0;
  }

  .draggable {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 400px;
    height: 30px;
    background: #c3c3c3;
    position: absolute;
    top: 300px;
    left: 300px;
    z-index: 3;
    opacity: 0;
    transition: opacity 0.2s ease-out 0.5s;
  }

  .draggable-head {
    line-height: 30px;
    text-indent: 10px;
    background: #47494e;
    color: white;
    width: 100%;
    cursor: pointer;
    height: 30px;
  }

  .draggable-content {
    height: 240px;
    background: #c3c3c3;

    overflow-y: auto;
  }

  .draggable-elem {
    padding: 5px 10px 2px 10px;
  }

  .draggable-elem:hover {
    background: #cccccc;
  }

  .draggable-elem span {
    float: right;
    padding: 0px 15px 2px;
    margin: 0;
    cursor: pointer;
  }

  .draggable-head-x {
    border-radius: 0 var(--radius) 0 0;
    padding: 0px 15px 0 5px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 4;
  }

  .draggable-head-x:hover {
    background: #57595e;
  }

</style>
