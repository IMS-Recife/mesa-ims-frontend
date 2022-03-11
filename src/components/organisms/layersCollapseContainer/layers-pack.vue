<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

const isOpen = ref(false);
const setOpenClose = () => {
  isOpen.value = !isOpen.value;
};
</script>
<template>
  <main
    class="layers-pack-container"
    :class="isOpen ? 'flex-col' : 'items-center'"
  >
    <button v-if="isOpen" class="collapse-button" @click="setOpenClose">
      <span
        class="iconify"
        data-icon="mdi:minus"
        data-height="24"
        data-width="24"
      />
    </button>

    <button v-else class="collapse-button" @click="setOpenClose">
      <span
        class="iconify"
        data-icon="mdi:plus"
        data-height="24"
        data-width="24"
      />
    </button>

    <header>
      <TextBodySmall class="title">{{ props.title }}</TextBodySmall>
    </header>
    <div v-if="isOpen" class="layers">
      <slot></slot>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.layers-pack-container {
  @apply relative flex justify-start rounded-lg bg-neutrals-lightgrey-light p-3 mt-4;
  > header {
    @apply flex flex-row justify-start items-center;

    > .title {
      @apply text-neutrals-darkgrey-light uppercase font-bold;
    }
  }
  > .collapse-button {
    @apply absolute top-1 right-0 m-2 outline-none text-brand-primary-medium;
  }
  > .layers {
    @apply flex flex-col justify-start py-2;
    > .layer-checkbox {
      @apply text-neutrals-darkgrey-medium;
    }
  }
}
</style>
