<script setup lang="ts">
defineProps<{
  message: string;
  date: string;
}>();
</script>
<template>
  <div class="notification">
    <p>{{ message }}</p>
    <p>{{ date }}</p>
  </div>
</template>
<style lang="scss" scoped>
.notification {
  @apply flex flex-row items-center justify-between w-full py-7 text-neutrals-darkgrey-medium;
}
</style>
