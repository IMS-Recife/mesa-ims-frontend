<script setup lang="ts">
interface Props {
  color?: string;
}

withDefaults(defineProps<Props>(), {
  color: "#191919",
});
</script>

<template>
  <div class="mr-2 status-circle" :style="`background-color: ${color}`" />
</template>

<style lang="scss" scoped>
.status-circle {
  @apply rounded-full w-4 h-4;
}
</style>
