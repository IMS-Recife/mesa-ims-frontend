<script setup lang="ts">
interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div v-if="props.isOpen" class="small-modal-container">
    <button class="close-button" @click="emit('close')">
      <span class="iconify" data-icon="mdi:close" data-width="24px" data-height="24px" />
    </button>
    <slot></slot>
  </div>
  <div v-if="props.isOpen" class="modal-background"></div>
</template>

<style lang="scss" scoped>
.small-modal-container {
  @apply absolute z-1000;
  @apply w-100 p-10 bg-neutrals-lightgrey-lightest;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  max-height: calc(100vh - 150px);

  > .close-button {
    @apply absolute top-4 right-4;
    @apply text-neutrals-darkgrey-medium;
  }
}

.modal-background {
  @apply absolute z-999 w-full h-full;
  background: rgba(196, 196, 196, 0.25);
}
</style>
