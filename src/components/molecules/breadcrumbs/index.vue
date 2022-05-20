<script lang="ts" setup>
import { BreadcrumbRoute } from "@/@types";

const props = defineProps<{
  routes: BreadcrumbRoute[];
}>();
</script>

<template>
  <div class="breadcrumb-container">
    <div v-for="route in props.routes" class="breadcrumb-list">
      <div v-if="route.currentPath" class="breadcrumb-item-current-path">
        <span v-if="route.icon" class="iconify mr-2" :data-icon="route.icon" />
        <p class="path">{{ route.name }}</p>
      </div>
      <div v-else class="breadcrumb-item">
        <span v-if="route.icon" class="iconify mr-2" :data-icon="route.icon" />
        <a class="path" :href="route.path">{{ route.name }}</a>
        <span
          class="iconify arrow-divider"
          data-icon="mdi:chevron-right"
          data-width="24"
          data-height="24"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-container {
  @apply flex items-center justify-center rounded-full w-min bg-neutrals-lightgrey-lightest border-brand-secondary-medium border-1 p-2;

  > .breadcrumb-list {
    @apply flex flex-row items-center;

    > .breadcrumb-item {
      @apply flex flex-row items-center text-brand-secondary-medium;

      > .path {
        @apply whitespace-nowrap underline;
      }

      > .arrow-divider {
        @apply text-neutrals-darkgrey-medium;
      }
    }

    > .breadcrumb-item-current-path {
      @apply flex flex-row items-center text-neutrals-darkgrey-dark;

      > .path {
        @apply whitespace-nowrap;
      }
    }
  }
}
</style>
