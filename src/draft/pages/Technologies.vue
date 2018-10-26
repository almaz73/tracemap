<template>
  <div>
    <Frame/>
    <div class="help">
      <h3>Выбранные технологии</h3>
      <ul>
        <li>vue - самый крутой и быстрый фрейворк, легок в обучении, вобрал в себя лучшее из angular и react</li>
        <li>vue-router</li>
        <li>vuex - единое хранилище состояний</li>
        <li>leaflet - движок карты (для добавления полиномов leaflet.draw, движение по карте leaflet.movingMarker)</li>
        <li>ESLint - анализ js-кода</li>
        <li>axios - для запросов, умеет сразу возвращать json</li>

      </ul>
      <br>
      Переходы по страницам:
      <b>&lt;router-link to="/mypage"&gt; Моя страница &lt;/router-link&gt;</b>
    </div>
  </div>
</template>

<script>
  import Frame from '../../draft/components/Frame';

  export default {
    name: 'Technologies',
    components: {
      Frame
    }
  };
</script>

<style scoped>
  .help {
    padding: 30px;
  }
</style>
