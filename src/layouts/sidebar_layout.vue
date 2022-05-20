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
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss"></style>
