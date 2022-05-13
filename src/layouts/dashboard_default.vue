<script setup lang="ts">
const ready = ref(false);
onMounted(() => {
  ready.value = true;
});
</script>
<template>
  <div>
    <div class="w-full h-full overflow-hidden relative">
      <Dashboard />
      <Map v-if="ready" class="map-dashboard" />
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
.map-dashboard {
  @apply w-screen h-screen relative;
}
</style>
