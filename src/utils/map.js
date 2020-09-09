import "leaflet/dist/leaflet.css"
import $L from "leaflet";
// 解决 leaflet 默认 maker 无法显示的问题
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = $L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
$L.Marker.prototype.options.icon = DefaultIcon;

  const createMap = (divId, options) => {
      let map = $L.map(divId, options);
      return map;
    };
  const createTileLayer = async (map, url, options) => {
    let tileLayer = await $L.tileLayer(url, options);
    tileLayer.addTo(map);
    return tileLayer;
  };
  const createIcon = options => {
    return $L.icon(options);
  };
  const createMakerByXY = (map, coordinate, options = {}) => {
    let marker = $L.marker($L.latLng(coordinate[1], coordinate[0]), options);
    marker.addTo(map);
    return marker;
  };
  //创建线要素 
  const createPolyline = (map, linePath, lineOpts) => {
    let polyline = $L.polyline(linePath, lineOpts);
    polyline.addTo(map);
    return polyline;
  };
  const createPolygon = (map, areaPath, areaOpts) => {
    let polygon = $L.polyline(areaPath, areaOpts);
    polygon.addTo(map);
    return polygon;
  };



export default { createMap,createTileLayer,createIcon,createMakerByXY,createPolyline,createPolygon};