<template>
  <div>
    <Frame/>
    <div class='tasks'>
      <h1>Задания</h1>
      <ul>
        <li class="s">Добавить карту, параметризовать (MapComponent)</li>
        <li>Нужна линейка на карте, показывающая длину линии согласно масштабу карты</li>
        <li class="s">Нужно показывать движение транспорта на карте, оставляя транспорт всегда посередине</li>
        <li class="s" title="Пока остановился на geoson, который нужно будет генерить со цветами секций">На карте сделать разноцветную траекторию, привязанную к скорости движения транспорта
          <a href="http://hgoebl.github.io/Leaflet.MultiOptionsPolyline/demo/">1</a>,
          <a href="https://gis.stackexchange.com/questions/90193/color-code-a-leaflet-polyline-based-on-additional-values-e-g-altitude-speed">2</a>
          <a href="https://oliv.github.io/leaflet-polycolor/" title="плавный переход по цветам">3</a>
        </li>
        <li class="s">Требуется сделать контрол показывающее дерево с раскрывающимися и выделяемыми ветками</li>
        <li class="s">Требуется редактор для создания полиномов ка карте по точкам нажатия курсором мышки.</li>
        <li>Механизм группирования, когда обьекты слишко близко.
          плагин: <a href="https://leafletjs.com/plugins.html#overlay-animations" title="Leaflet.FeatureGroup.SubGroup">1</a>
        </li>
        <li class="s">Слои и контрол включающий и выключаюий эти слои с полиномами</li>
        <li class="s" title="в Map2 стили перебиты">Кастомизировать кнопки "плюс+минус" леафлет под свой дизайн</li>
        <li class="s">Движение машинок по линиям с поворотам.</li>
        <li>При нажатии на машинки выдавать информацию.</li>
        <li>При нажатии на машинки выдавать информацию.</li>
        <li>Необходима линейка измеряющая расстояния на карте (как в 2ГИС).</li>

        <br/>
        <li>По дизайну колокольчик и панель оповещений</li>
        <li>По дизайну панелька комбобокса с группировкой</li>
        <li>По дизайну Инструменты при выборе синие </li>
        <li>По дизайну Строку поиска и крестик          </li>
        <li>По дизайну Панель легенды  </li>


      </ul>
      <br/>
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
