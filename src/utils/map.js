import "leaflet/dist/leaflet.css"
import $L from "leaflet";
// 引入 leaflet.markercluster
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster";

// 解决 leaflet 默认 maker 无法显示的问题
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
// 全部引用
// import * as esri from "esri-leafle"
// 按需引用
import {
  basemapLayer,
  featureLayer,
  tiledMapLayer,
  dynamicMapLayer,
  imageMapLayer
} from "esri-leaflet";
// import "esri-leaflet-renderers";
import "esri-leaflet-cluster";
// import "esri-leaflet-heatmap/dist/esri-leaflet-heatmap-debug";
import Cluster from "./esri-cluster";
// import Heatmap from "./esri-heatmap";

let DefaultIcon = $L.icon({
  iconAnchor: [13, 41], //图片对其方式
  iconUrl: icon,
  shadowUrl: iconShadow
});
$L.Marker.prototype.options.icon = DefaultIcon;

const createMap = (divId, options) => {
  let map = $L.map(divId, options);
  return map;
};
// 创建瓷砖图层
const createTileLayer = async (map, url, options) => {
  let tileLayer = await $L.tileLayer(url, options);
  tileLayer.addTo(map);
  return tileLayer;
};
// 创建图层切换控件
const createLayerControl= async (map,options) => {
  var baseLayers = {
    'Sputnik': L.tileLayer('http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png', {
        maxZoom: 18
    }),
 
    "CartoDB Positron": L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18
    }),
 
    "OSM": L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }),
 
    "OpenTopoMap": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }),
    "Tianditu1": L.tileLayer('http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=748a8c773c39c75a887e322a74727eb8', {
        maxZoom: 18
    }),
    "Tianditu2": L.tileLayer('http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=748a8c773c39c75a887e322a74727eb8', {
        maxZoom: 18
    }),
};
  let layerControl  = await $L.control.layers(baseLayers, options,{position: 'topleft',collapsed: true});
  layerControl.addTo(map);
  return layerControl;
};
// 创建图像覆盖物
const createImageOverlay=(map,imageUrl,imageBounds)=>{
   return $L.imageOverlay(imageUrl,imageBounds).addTo(map);
}
// 创建视频覆盖物
const createvideoOverlay=(map,videoUrl,videoBounds)=>{
  return $L.videoOverlay(videoUrl,videoBounds).addTo(map);
}
// 比例尺
const createControlScale = (map) => {
  var ControlScale= $L.control.scale({maxWidth:200,metric:true,imperial:false});
  ControlScale.addTo(map);
  return ControlScale;
};
// 创建icon
const createIcon = options => {
  return $L.icon(options);
};
// 创建标记
const createMakerByXY = (map, coordinate, options = {}) => {
  let marker = $L.marker($L.latLng(coordinate[1], coordinate[0]), options);
  marker.addTo(map);
  return marker;
};
//创建线要素 
const createPolyline = (map, linePath, lineOpts) => {
  let polyline = $L.polyline(linePath, lineOpts);
  polyline.addTo(map);
  // map.fitBounds(polyline.getBounds());
  return polyline;
};
// 创建面
const createPolygon = (map, areaPath, areaOpts) => {
  let polygon = $L.polyline(areaPath, areaOpts);
  polygon.addTo(map);
  return polygon;
};
// 添加弹窗
const createPopup = (map, options) => {
  let popup = $L.popup(options);
  return popup;
};
// 添加多个标记
const createMakerByLatlng = (latlng, options) => {
  return $L.marker(latlng, options);
};

// 存储鼠标样式
let CursorStyle = "";
// 添加鼠标样式
const addCursorStyle = (map, cursorStyle) => {
  CursorStyle = cursorStyle;
  $L.DomUtil.addClass(map._container, cursorStyle);
};
// 移除鼠标样式
const removerCoursorStyle = map => {
  $L.DomUtil.removeClass(map._container, CursorStyle);
};
// 添加底图图层
const addEsirBasemap = async (map, layerName) => {
  return await basemapLayer(layerName).addTo(map);
};
// 瓦片图层 
const addEsirTiledMapLayer = async (map, opts) => {
  return await tiledMapLayer(opts).addTo(map);
};
// 动态图层
const addEsirDynamicMapLayer = async (map, opts) => {
  return await dynamicMapLayer(opts).addTo(map);
};
// 影像图层
const addImageMaplayer = async (map, opts) => {
  return await imageMapLayer(opts).addTo(map);
};
// 要素图层
const addEsirFeatureLayer = async (map, opts) => {
  return await featureLayer(opts).addTo(map);
};
// 聚合图层
const addEsirClusterLayer = async (map, opts) => {
  return await Cluster(opts).addTo(map);
};
const createCircleMaker = (latlng, size, opts) => {
  return $L.circleMarker(latlng, size, opts);
};
// 点聚合
const createMakerCluster = () => {
  return $L.markerClusterGroup();
};

const getRandomLatLng = map => {
  let bounds = map.getBounds(),
    southWest = bounds.getSouthWest(),
    northEast = bounds.getNorthEast(),
    lngSpan = northEast.lng - southWest.lng,
    latSpan = northEast.lat - southWest.lat;

  return $L.latLng(
    southWest.lat + latSpan * Math.random(),
    southWest.lng + lngSpan * Math.random()
  );
};

export default {
  createImageOverlay,
  createControlScale,
  createLayerControl,
  createMap,
  createTileLayer,
  createIcon,
  createMakerByXY,
  createPolyline,
  createPolygon,
  createPopup,
  createMakerByLatlng,
  addCursorStyle,
  removerCoursorStyle,
  addEsirBasemap,
  addEsirTiledMapLayer,
  addEsirDynamicMapLayer,
  addImageMaplayer,
  addEsirFeatureLayer,
  addEsirClusterLayer,
  createCircleMaker,
  createMakerCluster,
  getRandomLatLng,
  createMakerByLatlng,
  createvideoOverlay
};