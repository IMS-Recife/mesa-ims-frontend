<script lang="ts" setup>
interface Props {
  id?: string;
  path: string;
  alt?: string;
  width?: string;
  height?: string;
}

withDefaults(defineProps<Props>(), {
  path: "",
  width: "24",
  height: "24",
});
</script>

<template>
  <button class="button-icon" type="button">
    <img :src="path" :alt="alt" :width="width" :height="height" />
  </button>
</template>

<style lang="scss">
.button-icon {
  @apply flex items-center justify-center
    h-12 px-2 py-2
    text-[12px] filter: drop-shadow-sm
    hover:brightness-110 hover:drop-shadow-lg;
  text-transform: uppercase;
  outline: transparent !important;
  min-width: 80px;
  min-height: 48px;
  max-height: 48px;
  border-radius: 8px;
  border: 1px solid #f1f1f1;
}
</style>
