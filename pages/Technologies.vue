<template>
  <div>
    <Frame/>
    <div class="help">
      <h3>Выбранные технологии</h3>
      <ul>
        <li>vue - самый крутой и быстрый фрейворк, легок в обучении, вобрал в себя лучшее из angular и react</li>
        <li>vuex - единое хранилище состояний</li>
        <li>nuxt - фреймворк на фреймворке VUEJS, позволяет делать статичные страницы, которые отличаются быстротой
          загрузки. Содержит в себе ESLint
        </li>
        <li>axios - для запросов, потому что умеет сразу возвращать json</li>
        <li>leaflet - движок карты</li>
      </ul>
      <br>
      Ссылки между страницвами должны быть типа
      <b>&lt;nuxt-link to="/mypage"&gt; Моя страница &lt;/nuxt-link&gt;</b>
    </div>
  </div>
</template>

<script>
  import Frame from '../components/Frame'

  export default {
    name: "Technologies",
    components: {
      Frame
    }
  }
</script>

<style scoped>
  .help {
    padding: 30px;
  }
</style>
