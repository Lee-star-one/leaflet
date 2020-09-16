<template>
  <div class="map-container">
    <div id="map-container"></div>
    <MapDraw
      @point="drawPoint"
      @polyline="drawPolyline"
      @polygon="drawPolygon"
      @end="drawOff"
    ></MapDraw>
  </div>
</template>
<script>
import MapDraw from "@/components/MapDraw.vue";
export default {
  components: { MapDraw },
  data() {
    return {
      map: null,
      OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      overLayer: {
        polylines: [],// 存放最终完成绘制后产生的线对象
        polygons: [],//存放最终完成绘制后产生的面对象
      },
      tempGp: {
        lineNode: [],// 绘制过程中用于生成线图形的坐标串
        lineNodeLen: 0,// 已添加节点数量
        tempLine: null,// 绘制完成前地图上的线对象
        tempNode: [],// 每次单击产生的节点对象

        polygonNode: [],// 绘制过程中用于生成面图形的坐标串
        polygonNodeLen: 0,// 已添加节点数量
        // tempNode: [],// 每次单击产生的节点对象
        tempPolygon: null,// 绘制完成前地图上的面对象
      }
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container");
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
    this.map.setView([51.505, -0.09], 13);
  },
  methods: {
    drawOn(fn) {
        this.clearTemps();
      // 监听地图点击事件
      this.map.off("click");
      this.map.off("mousemove");
      this.map.off("dblclick");
      this.map.doubleClickZoom.disable();
      this.map.on("click", (evt) => fn(evt));
    },
    clearTemps() {
      // 清空线中间数据
      this.tempGp.polygonNode = [];
      this.tempGp.polygonNodeLen = 0;
      if (this.tempGp.tempPolygon) this.tempGp.tempPolygon.remove();
      this.tempGp.tempNode.map(el => el.remove());
      // 清空面中间数据
      this.tempGp.lineNode = [];
      this.tempGp.lineNodeLen = 0;
      if (this.tempGp.tempLine) this.tempGp.tempLine.remove();
      this.tempGp.tempNode.map(el => el.remove());
    },
    drawOff() {
      // 移除监听地图点击事件
      this.map.off("click");
      this.map.off("mousemove");
      this.map.off("dblclick");
      this.map.doubleClickZoom.enable();
      // 复原鼠标平移样式
      this.$utils.map.removerCoursorStyle(this.map);
    },
    // 画点
    drawPoint() {
      this.$utils.map.addCursorStyle(this.map, "pointer-cursor");
      this.drawOn((evt) => {
        this.$utils.map.createMakerByLatlng(evt.latlng).addTo(this.map);
      });
    },
    // 画线
    drawPolyline() {
      this.$utils.map.addCursorStyle(this.map, "crosshare-cursor");
      // 绘制过程中的线样式
      let tempPolygonOpts = {
        color: "rgba(255, 0, 0, 0.85)",
        weight: 3,
        opacity: 0.85,
      };
      // 完成绘制的线样式，可以和上面的绘制过程中的线样式相同，但这里为了区分，取了颜色
      let finalPolygonOpts = {
        color: "rgba(0, 255, 0, 0.85)",
        weight: 3,
        opacity: 0.85,
      };
      //每一次点击都视为用户为想要绘制的线添加了一个节点
      this.drawOn(evt => {
        this.tempGp.lineNode.push([evt.latlng.lat, evt.latlng.lng]);
        this.tempGp.tempNode.push(this.addNode(evt.latlng, this.map));
        // 更新已添加节点数量
        this.tempGp.lineNodeLen = this.tempGp.lineNode.length;
      }),
      this.map.on("mousemove", evt => {
          // 第一次点击时地图上只现实第一个节点
          // 从第二次开始到绘制结束之前，不管用户添加了多少个点，鼠标移动时需要去跟新当 
        // this.tempGp.lineNode 中的第 n+1 个 这样来实现橡皮筋效果
        if (this.tempGp.lineNodeLen >= 1) {
            // 移除上一个图形
          if (this.tempGp.tempLine) this.tempGp.tempLine.remove();
           // 第n+1个点的索引为 this.tempGp.lineNodeLen + 1
            // 只要在下一次点击事件发生前，this.tempGp.lineNodeLen + 1 都一样
          this.tempGp.lineNode[this.tempGp.lineNodeLen] = [
            evt.latlng.lat,
            evt.latlng.lng
          ];
        // 绘制新的临时图形
          this.tempGp.tempLine = this.$utils.map.createPolyline(
            this.map,
            this.tempGp.lineNode,
            tempPolygonOpts
          );
        }
      });
      // 双击地图结束绘制
      this.map.on("dblclick", () => {
        this.overLayer.polylines.push(
          this.$utils.map.createPolyline(
            this.map,
            this.tempGp.lineNode,
            finalPolygonOpts
          )
        );
        // 重置临时数据
        this.tempGp.lineNode = [];
        this.tempGp.lineNodeLen = 0;
        this.tempGp.tempLine.remove();
        this.tempGp.tempNode.map(el => el.remove());
      });
    },
    addNode(latlng, map) {
      let node = this.$utils.map.createIcon({
        iconUrl: require("../assets/logo.png"),
        iconSize: [16, 16]
      });
      node = this.$utils.map.createMakerByLatlng(latlng, {
        icon: node
      });
      node.addTo(map);
      return node;
    },
    drawPolygon() {
        this.$utils.map.addCursorStyle(this.map, "crosshare-cursor");
        let tempPolygonOpts = {
        color: "rgba(255, 0, 0, 0.85)",
        weight: 3,
        opacity: 0.85,
        interactive:false
      };
      let finalPolygonOpts = {
        color: "rgba(0, 255, 0, 0.85)",
        weight: 3,
        opacity: 0.85,
        fill: true,
        fillColor: "#de0000",
        fillOpacity: 0.45,
      };
      this.drawOn(evt => {
        this.tempGp.polygonNode.push([evt.latlng.lat, evt.latlng.lng]);
        this.tempGp.polygonNodeLen = this.tempGp.polygonNode.length;
        this.tempGp.tempNode.push(this.addNode(evt.latlng, this.map));
      });
      this.map.on("mousemove", evt => {
        if (this.tempGp.tempPolygon) this.tempGp.tempPolygon.remove();
        if (this.tempGp.polygonNodeLen == 1) {
          this.tempGp.polygonNode[this.tempGp.polygonNodeLen] = [
            evt.latlng.lat,
            evt.latlng.lng
          ];
          this.tempGp.tempPolygon = this.$utils.map.createPolyline(
            this.map,
            this.tempGp.polygonNode,
            tempPolygonOpts
          );
        } else if (this.tempGp.polygonNodeLen >= 2) {
          this.tempGp.polygonNode[this.tempGp.polygonNodeLen] = [
            evt.latlng.lat,
            evt.latlng.lng
          ];
          this.tempGp.tempPolygon = this.$utils.map.createPolygon(
            this.map,
            this.tempGp.polygonNode,
            tempPolygonOpts
          );
        }
      });
      this.map.on("dblclick", () => {
        this.overLayer.polygons.push(
          this.$utils.map.createPolygon(
            this.map,
            this.tempGp.polygonNode,
            finalPolygonOpts
          )
        );
        this.tempGp.polygonNode = [];
        this.tempGp.polygonNodeLen = 0;
        this.tempGp.tempPolygon.remove();
        this.tempGp.tempNode.map(el => el.remove());
      });
    },
  },
};
</script>
<style lang="less">
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  #map-container {
    width: 100%;
    height: 100%;
  }
}
</style>