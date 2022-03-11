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
  ui.togglePreConfigSidebarVision(false);
  ui.toggleSidebarVision(false);
  mapStore.setIsDisabledMap(true);
});
</script>

<template>
  <div class="page-home"></div>
</template>
<style lang="scss"></style>
