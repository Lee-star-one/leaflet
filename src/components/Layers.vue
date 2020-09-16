<template>
  <div class="map-layers">
    <ul>
      <li :class="[{ active: activeTool == 'basemapLayer' }]" @click="basemaplayer">basemapLayer</li>
      <li :class="[{ active: activeTool == 'tiledMapLayer' }]" @click="tiledmapLayer">tiledMapLayer</li>
      <li :class="[{ active: activeTool == 'Dynamiclayer' }]" @click="addDynamiclayer">Dynamiclayer</li>
      <li :class="[{ active: activeTool == 'imageMapLayer' }]" @click="addImageLayer">imageMapLayer</li>
      <li :class="[{ active: activeTool == 'Featurelayer' }]" @click="addFeaturelayer">featureLayer</li>
      <li :class="[{ active: activeTool == 'ClusterLayer' }]" @click="addClusterLayer">clusterLayer</li>
      <li>heatmap</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTool: ""
    };
  }, 
  methods:{
      basemaplayer() {
      if (this.activeTool !== "basemapLayer") {
        this.activeTool = "basemapLayer";
        this.$emit("basemapLayer");
      } else {
        this.activeTool = "";
      }
    },
    tiledmapLayer() {
      if (this.activeTool !== "tiledMapLayer") {
        this.activeTool = "tiledMapLayer";
        this.$emit("tiledMapLayer");
      } else {
        this.activeTool = "";
      }
    },
    addDynamiclayer() {
      if (this.activeTool !== "Dynamiclayer") {
        this.activeTool = "Dynamiclayer";
        this.$emit("addDynamiclayer");
      } else {
        this.activeTool = "";
      }
    },
    async addImageLayer() {
      if (this.activeTool !== "imageMapLayer") {
        this.activeTool = "imageMapLayer";
        this.$emit("imageMapLayer");
      } else {
        this.activeTool = "";
      }
    },
    async addFeaturelayer() {
      if (this.activeTool !== "Featurelayer") {
        this.activeTool = "Featurelayer";
        this.$emit("addFeaturelayer");
      } else {
        this.activeTool = "";
      }
    },
    async addClusterLayer() {
      if (this.activeTool !== "ClusterLayer") {
        this.activeTool = "ClusterLayer";
        this.$emit("addClusterLayer");
      } else {
        this.activeTool = "";
      }
    },
  }
  
}
</script>
<style lang="less">
.map-layers {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 999;
  height: 36px;
  box-shadow: 0px 0px 50px 2px rgba(0, 0, 0, 0.35);
  background-color: #fff;
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      padding: 0 5px;
      height: 36px;
      font-size: 13px;
      line-height: 36px;
      cursor: pointer;
    }
    li.active {
      background-color: rgb(102, 156, 255);
      color: #fff;
    }
    li:hover {
      background-color: rgb(212, 224, 246);
    }
  }
}
</style>