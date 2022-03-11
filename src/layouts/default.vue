<script setup lang="ts">
const ready = ref(false);
onMounted(() => {
  ready.value = true;
});
</script>
<template>
  <div>
    <div class="w-full overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.map-dashboard {
  @apply w-screen h-screen relative;
}
</style>
