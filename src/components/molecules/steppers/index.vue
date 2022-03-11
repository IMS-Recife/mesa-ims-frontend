<script lang="ts" setup>
interface Steppers {
  label: string;
  path?: string;
  stepper: number;
}

defineProps<{
  current: number;
  options: Steppers[];
}>();
</script>
<template>
  <div class="steppers-base">
    <ul class="stepper">
      <li
        v-for="(item, index) in options"
        :key="index"
        class="stepper-item"
        :class="current < item.stepper ? '-disabled' : ''"
      >
        <button
          class="stepper-btn"
          :class="current > item.stepper ? '-finish' : ''"
          :disabled="current < item.stepper"
        >
          <span
            v-if="current > item.stepper"
            class="iconify"
            data-icon="teenyicons:tick-small-outline"
            data-width="16"
          ></span>
          <span v-else>{{ item.stepper }}</span>
        </button>
        <span
          class="stepper-label"
          :class="current > item.stepper ? '-finish' : ''"
        >
          {{ item.label }}
        </span>
        <span class="bar"></span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.steppers-base {
  @apply flex justify-center relative w-full h-full;

  > .stepper {
    @apply flex items-center justify-center relative gap-2 h-[84px];
    .stepper-item {
      @apply relative flex justify-center items-center;
      > .bar {
        @apply bg-neutrals-lightgrey-dark mx-4 h-[1px] w-[80px] relative;
      }
    }

    > .stepper-item:last-child {
      @apply relative flex justify-center items-center;
      > .bar {
        @apply hidden;
      }
    }
  }

  .stepper-item {
    > .stepper-btn {
      @apply rounded-1 h-[24px] w-[24px] relative top-0 left-0 bg-brand-secondary-dark text-neutrals-lightgrey-medium text-[14px] text-stroke-neutrals-lightgrey-light  cursor-default outline-transparent;
      &.-disabled {
        @apply bg-neutrals-lightgrey-dark text-neutrals-lightgrey-medium cursor-not-allowed;
      }
      &.-finish {
        @apply bg-brand-primary-light text-neutrals-lightgrey-medium;
      }
    }
    > .stepper-label {
      @apply absolute flex justify-center items-center top-10 left-[-50px] text-center w-[120px] text-[12px] text-neutrals-darkgrey-dark font-semibold;
      &.-disabled {
        @apply opacity-50;
      }
      &.-finish {
        @apply text-brand-primary-medium;
      }
    }
    &.-disabled {
      @apply opacity-50 cursor-not-allowed;
      > .stepper-btn {
        @apply bg-neutrals-lightgrey-dark;
      }
    }
  }
}
</style>
