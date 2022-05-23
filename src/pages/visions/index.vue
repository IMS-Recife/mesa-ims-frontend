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
  ui.toggleLoading(true);
  ui.toggleSidebarVision(true);
  ui.togglePreConfigSidebarVision(true);
  mapStore.setNameClearZone("");
  setTimeout(() => {
    mapStore.setNameClearZone("Zona Parque");
    ui.toggleLoading(false);
  }, 200);
  mapStore.setSearchNameLayer("");
  mapStore.setAreaCurrent(0);
  mapStore.setNameClearLayer(mapStore.searchNameLayer);
  mapStore.setResultCountLayerRender([]);
  mapStore.setResultLayerCurrentVision([]);
  mapStore.clearMarkers(mapStore.isClearMap);
  if (ui.resetUi) {
    ui.setResetUI(false);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
});

onBeforeUnmount(() => {
  ui.togglePreConfigSidebarVision(false);
  ui.toggleSidebarVision(false);
});
</script>

<template>
  <div class="page-vision"></div>
</template>
<style lang="scss"></style>
