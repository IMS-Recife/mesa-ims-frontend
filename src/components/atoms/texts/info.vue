<script setup lang="ts">
interface Props {
  info?: string;
}

withDefaults(defineProps<Props>(), {
  info: "Information",
});
</script>

<template>
  <h4 class="info-base">
    {{ info }}
  </h4>
</template>

<style lang="scss">
.info-base {
  @apply font-sans text-stroke-neutrals-darkgrey-dark text-[14px] font-normal relative w-[289px];
}
</style>
