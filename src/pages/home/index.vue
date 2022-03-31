<route lang="yaml">
name: home
meta:
  layout: dashboard_default
</route>

<script setup lang="ts">
import { useMapStore } from "@stores/map";
import { useUIStore } from "@/stores/ui";
const ui = useUIStore();
const mapStore = useMapStore();

onBeforeMount(async () => {
  mapStore.clearMarkers(mapStore.isClearMap);
  ui.togglePreConfigSidebarVision(false);
  mapStore.setNameClearZone("");
  setTimeout(() => {
    mapStore.setNameClearZone("Zona Parque");
    ui.toggleSidebarVision(false);
  }, 400);
  mapStore.setSearchNameLayer("");
  mapStore.setAreaCurrent(0);
  mapStore.setNameClearLayer(mapStore.searchNameLayer);
  mapStore.setResultCountLayerRender([]);
  mapStore.setResultLayerCurrentVision([]);
});
watch(
  () => ui.resetUi,
  (value) => {
    console.log(value, "value");
    if (value) {
      ui.setResetUI(false);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="page-home"></div>
</template>
<style lang="scss"></style>
