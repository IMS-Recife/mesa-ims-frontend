<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import { useMapStore } from "@/stores/map";
const ui = useUIStore();
const mapStore = useMapStore();
</script>
<template>
  <div class="dashboard-container">
    <Sidebar />
    <SearchInput v-if="ui.isSearchInputOpen" />
    <NotificationsTab v-if="ui.isNotificationsTabOpen" />
    <VisionSidebar v-if="ui.isSidebarVision" />
    <PreConfigVisionSidebar v-if="ui.isPreConfigVision" />

    <InfoPopup v-if="ui.isInfoPopupLayer" title="Legenda de camadas">
      <template v-slot:default>
        <div
          v-for="(itemy, index) in mapStore.layersCurrentVision"
          :key="index"
          class="-info-popup-content-row"
        >
          <StatusLayers :color="itemy.color" />
          <TextSmall class="flex"
            >{{ itemy.name }} &nbsp;
            <TextSmall
              v-for="(itemx, index) in mapStore.countLayerRender"
              :key="index"
            >
              {{
                // itemy.name === itemx.layer ? `(${itemx.count})` : ""
                itemy.name === itemx.layer ? `` : ""
              }}</TextSmall
            >
          </TextSmall>
        </div>
      </template>
    </InfoPopup>
  </div>
</template>
<style lang="scss" scoped>
.dashboard-container {
  @apply absolute flex flex-row z-500 h-0 w-full;
}
.content-info-popup {
  @apply absolute flex flex-col z-500 h-0 w-full right-0;
}
</style>
