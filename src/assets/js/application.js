/**
 * Глобальные переменные
 */

export default {
  map: {},
  props: {
    somethingElse: null
  },
  brigadeQueue: [], // ссылка чтобы обновить состояние комбобокса автомобилей
  // tiles: {
  //   osm: ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}],
  //   yandex: ['http://vec{s}.maps.yandex.net/tiles?l=map&v=4.55.2&z={z}&x={x}&y={y}&scale=2&lang=ru_RU', {
  //     subdomains: ['01', '02', '03', '04'],
  //     attribution: '<a http="yandex.ru" target="_blank">Яндекс</a>',
  //     reuseTiles: true,
  //     updateWhenIdle: false
  //   }],
  //   googleStreets: ['http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  //     maxZoom: 20,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  //   }],
  //   googleHybrid: ['http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  //     maxZoom: 20,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  //   }],
  //   googleSat: ['http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  //     maxZoom: 20,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  //   }],
  //   googleTerrain: ['http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
  //     maxZoom: 20,
  //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  //   }],
  //   layerOsm: ['https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  //     subdomains: ['server', 'services'],
  //     maxZoom: 19,
  //     noWrap: false,
  //     attribution: '<a href="https://www.arcgis.com/">ArcGIS</a>'
  //   }]
  // }
  colorByCallSignId: {
    2: {img: 'sp', text: 'Скорая помощь'},
    3: {img: 'np', text: 'Неотложный вызов'},
    5: {img: 'pp', text: 'Перевозка плановая'},
    6: {img: 'pe', text: 'Перевозка плановая экстренная'},
    7: {img: 'spc', text: 'СПЦ'}
  },
  brigadeImgConsts: {
    '1': {img: 'free', text: 'Свободна'},
    '2': {img: 'comeToStation', text: 'Возврат на подстанцию'},
    '3': {img: 'atStation', text: 'На подстанции'},
    '4': {img: 'fueling', text: 'Бензин'},
    '5': {img: 'medicalFueling', text: 'Медикаменты'},
    '6': {img: 'carHandling', text: 'Передача вызова'},
    '7': {img: 'lunch', text: 'Обед'},
    '8': {img: 'onCall', text: 'На вызове'},
    '9': {img: 'goFromStation', text: 'Выезд с подстанции'},
    '10': {img: 'nearCallPlace', text: 'Доезд к месту вызова'},
    '11': {img: 'hospitalization', text: 'Госпитализация'},
    '12': {img: 'nearLPU', text: 'Доезд к ЛПУ'},
    '13': {img: 'receivePatient', text: 'Доставлен в ЛПУ'},
    '14': {img: 'dispatcherClosing', text: 'Снята диспетчером'},
    '15': {img: 'repairs', text: 'Ремонт'},
    '16': {img: 'dispatcherClosing', text: 'На обед'},
    '17': {img: 'dispatcherClosing', text: 'Пересменка'},
    '18': {img: 'dispatcherClosing', text: 'Замена машины'}
  }
}
