/**
 * Библиотека сжатия координат
 * @param polyline - необработанные данные в виде "yx}zGafkeHwA~BqGdK{CjFiGpCkKvEWo@YXCl@e@`@{Af ..."
 * @returns {Array}
 */
function decodePolyline(polyline) {

  let currentPosition = 0;

  let currentLat = 0;
  let currentLng = 0;

  let dataLength = polyline.length;

  let polylineLatLngs = [];

  while (currentPosition < dataLength) {

    let shift = 0;
    let result = 0;

    let byte;

    do {
      byte = polyline.charCodeAt(currentPosition++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    currentLat += deltaLat;

    shift = 0;
    result = 0;

    do {
      byte = polyline.charCodeAt(currentPosition++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let deltLng = ((result & 1) ? ~(result >> 1) : (result >> 1));

    currentLng += deltLng;

    // polylineLatLngs.push(new L.LatLng(currentLat * 0.00001, currentLng * 0.00001));
    polylineLatLngs.push([currentLat * 0.00001, currentLng * 0.00001]);
  }


  return polylineLatLngs;
}

export default decodePolyline;
