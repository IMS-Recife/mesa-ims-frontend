<script setup lang="ts">
// import { useUIStore } from "@/stores/ui";
// const ui = useUIStore();
import { useMapStore } from "@/stores/map";
const mapStore = useMapStore();
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="info-popup-container">
    <button
      class="close-button"
      @click="mapStore.setResultLayerCurrentVision([])"
    >
      <span class="iconify" data-icon="mdi:close" />
    </button>
    <div class="popup-content">
      <header>
        <Caption class="text-brand-secondary-medium">
          {{ props.title }}
        </Caption>
      </header>

      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.info-popup-container {
  @apply absolute pt-4 pb-8 px-6 bg-neutrals-lightgrey-lightest border border-brand-secondary-light 
  rounded-lg z-800 w-100 max-h-[132px] overflow-y-auto
  smtb:top-[83vh] mdtb:top-[83vh] smdt:top-[81vh] mdhd:top-[85vh]  right-[344px];

  > .close-button {
    @apply absolute top-0 right-0 m-4 text-neutrals-darkgrey-medium outline-none;
  }

  > .popup-content {
    @apply flex flex-col;
    > main {
      @apply mt-2;
    }
  }
}

.-info-popup-title {
  @apply text-brand-secondary-medium text-12px font-bold;
  line-height: 20px;
}

.-info-popup-content {
  @apply text-neutrals-darkgrey-medium text-[12px] ml-2;
}

.-info-popup-content-row {
  @apply flex flex-row items-center flex-nowrap mt-3;
}
</style>
