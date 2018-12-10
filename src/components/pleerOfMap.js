// обработав массив рисуем разноцветную линию
// вычислив интервалы времени пускаем по ней маркер
// связываем с проигрываетелем: запуск/ пауза
// по нажатию на линию, перетаскиваем маркер, показываем данные для выбранного участка


let me = this;
let colorSpeed = {
  "0": "black",
  "1": "gray",
  "2": "blue",
  "3": "green",
  "4": "orange",
  "5": "pink",
  "6": "violet",
  "7": "red",
  "8": "yellow",
}

import application from '../assets/js/application'
import '../assets/vendor/Leaflet.MovingMarker/MovingMarker';

this.show = function (data, duration) {
  // получил даныне
  me.rootTimeArr = [];
  me.rootCoordinatesArr = [];
  me.rootInfo = [];

  let timeArr = [];

  // добавим остановки
  data.stops.map(el => {
    L.circle([el.coordinates[1], el.coordinates[0]], {
      color: "black",
      fillColor: "yellow",
      fillOpacity: 0.5,
      radius: 20
    }).addTo(application.map);
  });

  let distance = 0; // чтобы суммировать весь пройденный путь

  // добавим разноцветные линии, создадим массивы интервалов времени, запомним данные
  data.routes && data.routes.map(el => {
    if (!el.properties) return;
    let deltaTime = getDeltaTime(el.properties.start, el.properties.end);
    let partTime = deltaTime / (el.coordinates.length - 1);

    // чтобы при переходах не было повторений, удаляем последние узлы, перед добавлением нового,
    // потому что они приходят повторно
    if (me.rootCoordinatesArr.length) {
      me.rootCoordinatesArr.splice(-1, 1);
      timeArr.splice(-1, 1);
      me.rootInfo.splice(-1, 1);
    }

    let distancePart = el.properties.distance / (el.coordinates.length);
    let speed = el.properties.speed;
    let time = new Date(el.properties.start).getTime();

    // каждому узлу добавляю кусочек времени
    me.rootCoordinatesArr.push(...el.coordinates);
    el.coordinates.map(it => {
      time += partTime * 1000000;
      distance += distancePart;
      me.rootInfo.push({distance, speed, time});
      timeArr.push(partTime)
    });

    L.polyline(el.coordinates, {
      color: colorSpeed[el.properties.speedGroup],
      opacity: 0.7,
      weight: 7
    }).addTo(application.map);
  });

  // запомним первоначальное состояние для изменения скорости просмотра
  me.rootTimeArr = Object.assign([], timeArr);

  // общее время для участка
  me.totalTime = timeArr.reduce((a, b) => a + b, 0);

  // опредеяем границы просмотра
  application.map.fitBounds(me.rootCoordinatesArr);

  // добавляем проигывание
  newAnimation(me.rootCoordinatesArr, me.rootTimeArr, duration);

  newPopup(0);
};

/**
 * Получаем нитервал времени в миллисекундах
 */
function getDeltaTime(timeStart, timeEnd) {
  return (new Date(timeEnd).getTime() - new Date(timeStart).getTime()) / 3600000;
}

/**
 * Проигрывание/пауза
 */
this.playClick = function (el) {
  if (el) {
    me.marker.pause();

    let latlng = me.marker.getLatLng();
    this.findNode(latlng.lat, latlng.lng);
  }
  else me.marker.start();
  if (me.marker.isRunning()) setSlider(); // чтобы обновить вид кнопки плеера
};

function setSlider() {
  me.marker.closePopup();
  setTimeout(() => {
    if (me.marker.isRunning()) setSlider();
    else me.callBack(true);
  }, 100)
}

/**
 * Изменили скорость проигрывания
 */
this.durationChanged = function (duration) {
  newAnimation(me.rootCoordinatesArr, me.rootTimeArr, duration);
  newPopup(0);
};

// находим ближайший узел и строим новый макер
// показываем данные над маркером
this.findNode = function (lat, lng) {
  let dist;
  let node = {dist: Infinity, index: 0};
  me.rootCoordinatesArr.map((el, index) => {
    dist = Math.sqrt(Math.pow((lng - el[1]), 2) + Math.pow((lat - el[0]), 2));
    if (dist < node.dist) {
      node.dist = dist;
      node.index = index;
    }
  });

  // отрезаем начиная с этого узла
  let tmpTimeArr = me.rootTimeArr.slice(node.index);
  let coordinatesArr = me.rootCoordinatesArr.slice(node.index);

  newAnimation(coordinatesArr, tmpTimeArr, undefined, node.index);
  newPopup(node.index)
};

/**
 * Удалив старую анимацию готовим новую
 * на остановленную точку
 * @param [] coordinatesArr
 * @param [] tmpTimeArr
 * @param Numnber duration
 */
function newAnimation(coordinatesArr, tmpTimeArr, duration, index) {
  duration = duration || me.duration;
  me.duration = duration;

  // добавляем каждому узлу интервал врмени
  let SpeedUP = duration * 1000 / me.totalTime;
  let timeArr = [];
  tmpTimeArr.map(el => timeArr.push(el * SpeedUP));

  // добавляем проигрывание
  if (me.marker) application.map.removeLayer(me.marker);
  me.marker = L.Marker.movingMarker(coordinatesArr, timeArr).addTo(application.map);

  me.marker.on('onclick', function (e) {
    this.openPopup();
  });
}

/**
 * На остановленную точку готовим тултип
 */
function newPopup(index) {
  // готовим тултип с информацией
  let info = me.rootInfo[index || 0];
  let date = new Date(info.time);
  let popupContent = 'Скорость: ' + info.speed + ' км/час';
  let distance = parseInt(info.distance * 100) / 100;

  popupContent += '<br>Время: ' + date.getHours() + ':' + date.getMinutes();
  popupContent += '<br>Путь: ' + distance + ' км';
  me.marker.bindPopup(popupContent)
}

export default this;






