<template>
  <div id="draggable" v-if="alarms.length">
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
      return this.$store.state.alarms;
    }
  },
  created() {
    this.moveAlarms = function() {
      let me = this;
      let elem = document.getElementById('draggable');

      if (!elem) return;

      elem.onmousedown = e => {
        let coords = getCoords(elem);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        if (e.target.className === 'draggable-head-x') { // уменьшение
          if (!me.isSmall) elem.style.top = (window.innerHeight - 30) + 'px';
          else if (coords.top > (window.innerHeight - 200)) elem.style.top = (window.innerHeight - 200) + 'px';
          me.isSmall = !me.isSmall;
        }

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

      function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
      }
    };
  },
  methods: {
    deleteElem(elem) {
      let alarms = this.alarms.filter(el => el.id !== elem.id);
      this.$store.dispatch('setAlarms', alarms);
    }
  },
  mounted() {
    this.moveAlarms();
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

  .draggable-head, #draggable {
    border-radius: var(--radius) var(--radius) 0 0;
  }

  #draggable {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 400px;
    height: 30px;
    background: #c3c3c3;
    position: absolute;
    top: 300px;
    left: 300px;
    z-index: 3;
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
    min-height: 150px;
    max-height: 150px;
    background: #c3c3c3;

    overflow-y: auto;
  }
  .draggable-elem{
    padding: 5px 10px 2px 10px;
  }
  .draggable-elem:hover{
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
