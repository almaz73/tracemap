<template>
  <div>
    <Frame/>
    <div class='tasks'>
      <h1>Задания</h1>
      <ul>
        <li class="s">Добавить карту, параметризовать (MapComponent)</li>
        <li>Нужна линейка на карте, показывающая длину линии согласно масштабу карты</li>
        <li>Нужно показывать движение транспорта на карте, оставляя транспорт всегда посередине</li>
        <li>На карте сделать разноцветную траекторию, привязанную к скорости движения транспорта
          <a href="http://hgoebl.github.io/Leaflet.MultiOptionsPolyline/demo/">1</a>,
          <a href="https://gis.stackexchange.com/questions/90193/color-code-a-leaflet-polyline-based-on-additional-values-e-g-altitude-speed">2</a>
          <a href="https://oliv.github.io/leaflet-polycolor/" title="плавный переход по цветам">3</a>
        </li>
        <li>Требуется сделать контрол показывающее дерево с раскрывающимися и выделяемыми ветками</li>
        <li>Требуется редактор для создания полиномов ка карте по точкам нажатия курсором мышки</li>
        <li>Механизм группирования, когда обьекты слишко близко</li>
        <li>Слои и контрол включающий и выключаюий эти слои с полиномами</li>
        <li>Кастомизировать кнопки "плюс+минус" леафлет под свой дизайн</li>
      </ul>
    </div>
  </div>

</template>

<script>
  import Frame from "../components/Frame";

  export default {
    name: "Tasks",
    components: {Frame}
  }
</script>

<style>
  .tasks {
    padding: 30px;
  }

  .s {
    text-decoration: line-through;
  }
</style>
