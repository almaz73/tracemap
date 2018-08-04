<template>
    <div id="draggable">
      <div >Плавающая панелька</div>
      <div>Текст</div>
    </div>
</template>

<script>
export default {
  name: 'Alert',
  mounted() {
    let elem = document.getElementById('draggable');

    elem.onmousedown = e => {
      let coords = getCoords(elem);
      let shiftX = e.pageX - coords.left;
      let shiftY = e.pageY - coords.top;

      document.body.appendChild(elem);
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
  },

  methods: {}
};
</script>

<style scoped>
  #draggable{
    width: 300px;
    height: 150px;
    background: #7f828b;
    position: absolute;
    top:300px;
    left:300px;
    z-index: 300;
  }
  .alert:hover{
    background: #47494e;
  }
</style>
