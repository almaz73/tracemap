// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //"semi": [2, "always"],
    //"semi": [2, "never"], // по умолчанию не нужно ставить точу с запятой в конце
    "semi": 0, // не важно есть точка с запоятой в конце или нет
    "space-before-function-paren": 0,
    "quotes": 0, //отключаем проверку на двойные или одинарные ковычки
    "indent": 0, // отключаем требованние отступа в коде
    "no-multiple-empty-lines": 0,
    "padded-blocks": 0, // придирки к пустым местам
    "new-cap": 0, // придирается, что метоод не начинается с большой буквы
    "no-async-in-computed-properties": 0,
    "comma-dangle": 0,
    "no-return-assign": 0 // не всегда требуется возвращать ответ со стрелочной функции
  }
}
