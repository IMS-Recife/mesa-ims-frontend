<route lang="yaml">
name: vision
meta:
  layout: dashboard_default
</route>

<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import { useMapStore } from "@/stores/map";

const mapStore = useMapStore();
const ui = useUIStore();

onBeforeMount(() => {
  ui.toggleSidebarVision(true);
  ui.togglePreConfigSidebarVision(true);
  mapStore.setNameClearZone("");
  setTimeout(() => {
    mapStore.setNameClearZone("Zona Parque");
  }, 300);
  mapStore.setSearchNameLayer("");
  mapStore.setAreaCurrent(0);
  mapStore.setNameClearLayer(mapStore.searchNameLayer);
  mapStore.setResultCountLayerRender([]);
  mapStore.setResultLayerCurrentVision([]);
  mapStore.clearMarkers(mapStore.isClearMap);
});
</script>

<template>
  <div class="page-vision"></div>
</template>
<style lang="scss"></style>
