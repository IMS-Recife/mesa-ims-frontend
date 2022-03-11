<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Titulo",
});
</script>

<template>
  <h1 class="title-base">
    {{ title }}
  </h1>
</template>

<style lang="scss">
.title-base {
  @apply font-display text-brand-secondary-dark text-[24px] font-semibold relative w-full;
  margin: auto;
}
</style>
