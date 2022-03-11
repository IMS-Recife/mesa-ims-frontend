<script setup lang="ts">
// import { LayersCategory } from "@/@types";

const props = defineProps<{
  title: string;
  layersCategories: any[];
}>();

const isOpen = ref(false);
const setOpenClose = () => {
  isOpen.value = !isOpen.value;
};
</script>
<template>
  <main class="container">
    <button v-if="isOpen" class="collapse-button" @click="setOpenClose">
      <span
        class="iconify"
        data-icon="mdi:minus"
        data-height="24"
        data-width="24"
      ></span>
    </button>

    <button v-else class="collapse-button" @click="setOpenClose">
      <span
        class="iconify"
        data-icon="mdi:plus"
        data-height="24"
        data-width="24"
      ></span>
    </button>

    <header>
      <span
        class="iconify layer-icon"
        data-icon="mdi:layers"
        data-height="24"
        data-width="24"
      ></span>
      <h4>{{ props.title }}</h4>
    </header>
    <div v-if="isOpen">
      <LayersPack
        v-for="layerType in props.layersCategories"
        :title="layerType.name"
        :key="layerType.name"
      >
        <Layer
          v-for="layer in layerType.layers"
          :key="layer?.name"
          :layer-category="layerType.name"
          :layerName="layer?.name"
        />
      </LayersPack>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.container {
  @apply relative w-full rounded-[8px] bg-neutrals-lightgrey-lightest px-2 py-4 border border-neutrals-lightgrey-medium mt-4 z-999;
  > header {
    @apply flex flex-row items-center;

    > h4 {
      @apply text-[20px] text-neutrals-darkgrey-medium font-display ml-2;
    }

    > .layer-icon {
      @apply text-brand-primary-medium;
    }
  }
  > .collapse-button {
    @apply absolute top-2 m-2 right-0 outline-none text-brand-primary-medium flex items-center;
  }
  > .layers-pack-container {
    @apply flex flex-col justify-start bg-neutrals-lightgrey-medium rounded-[8px] p-3;
    > .layers {
      @apply flex flex-col justify-start p-3;
      > .layer-checkbox {
        @apply text-neutrals-darkgrey-medium;
      }
    }
  }
}
</style>
