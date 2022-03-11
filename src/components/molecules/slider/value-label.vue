<script setup lang="ts">
interface Props {
  backgroundColor: string;
  labelValue: number;
  selectedValue: number;
}
const props = defineProps<Props>();
const classBackgroundColor = computed(() => {
  switch (props.backgroundColor) {
    case "secondary-medium":
      return "-bg-secondary-medium";
    case "secondary-dark":
      return "-bg-secondary-dark";
    case "neutral-light":
      return "-bg-neutral-light";
    default:
      return "-bg-secondary-medium";
  }
});
</script>

<template>
  <div class="value-label" :class="classBackgroundColor">
    <div class="content">
      <slot></slot>
    </div>
    <div class="container-tail" :class="classBackgroundColor"></div>
  </div>
</template>

<style lang="scss" scoped>
.value-label {
  @apply flex items-center justify-center rounded-md w-10 h-9 py-2 relative pointer-events-none;
  > .content {
    @apply z-51;
  }
  > .container-tail {
    @apply absolute -bottom-1 w-5 h-5 z-999 transform rotate-45 z-50;
  }
}
.-bg-secondary-medium {
  @apply bg-brand-secondary-medium text-neutrals-lightgrey-light;
}
.-bg-secondary-dark {
  @apply bg-brand-secondary-dark text-neutrals-lightgrey-light;
}
.-bg-neutrals-lightgrey-medium {
  @apply bg-neutrals-lightgrey-medium text-neutrals-lightgrey-darkest;
}
</style>
