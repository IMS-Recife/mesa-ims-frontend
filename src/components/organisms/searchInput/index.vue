<script setup lang="ts"></script>
<template>
  <div class="search-container">
    <input type="text" placeholder="Digite aqui o termo que deseja usar" />
    <span
      class="iconify search-icon"
      data-icon="mdi:magnify"
      data-width="24"
      data-height="24"
    />
  </div>
</template>
<style lang="scss" scoped>
.search-container {
  @apply flex items-center justify-center bg-neutrals-lightgrey-light h-[88px] top-0 left-20 w-full shadow-md z-20;

  > input {
    @apply w-4/6 h-full outline-none bg-neutrals-lightgrey-light;
  }
  ::placeholder {
    @apply text-brand-secondary-medium;
  }
  > .search-icon {
    @apply text-brand-secondary-medium;
  }
}
</style>
