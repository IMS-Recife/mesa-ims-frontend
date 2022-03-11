<script lang="ts" setup></script>

<template>
  <button class="button-base" type="button">
    <slot />
  </button>
</template>

<style lang="scss">
.button-base {
  @apply flex items-center justify-center
    h-12 px-4 py-4
    text-[12px]
    hover:brightness-110 hover:filter uppercase;

  outline: transparent !important;
  min-width: 100px;
  min-height: 40px;
  max-height: 40px;
  border-radius: 12px;

  .icon-left {
    @apply pr-4;
  }
  .icon-right {
    @apply pl-4;
  }
  &.-primary {
    @apply bg-brand-primary-medium  text-neutrals-lightgrey-lightest;
    &:not(.-filled) {
      @apply text-neutrals-lightgrey-lightest;
    }
  }
  &.-secondary {
    @apply bg-brand-secondary-medium  text-neutrals-lightgrey-lightest;
    &:not(.-filled) {
      @apply text-neutrals-lightgrey-lightest;
    }
  }
  &.-tertiary {
    @apply bg-neutrals-lightgrey-medium text-neutrals-darkgrey-darkest;
    // &:not(.-filled) {
    //   @apply bg-neutrals-lightgrey-medium text-neutrals-darkgrey-darkest;
    // }
    &:hover {
      @apply bg-neutrals-darkgrey-lightest text-neutrals-darkgrey-darkest;
    }
  }
  &.-filled {
    @apply border-transparent;
  }
  &.-flat {
    @apply border-transparent bg-transparent text-neutrals-darkgrey-darkest font-700;
    text-transform: none;
  }
  &.-outlined {
    @apply bg-transparent border border-solid border-neutrals-lightgrey-medium hover:brightness-110;
  }
  &.-link {
    @apply bg-transparent;
  }
  &.-icon {
    @apply w-min;
  }
  &.-block {
    @apply w-full;
  }
  &.-link {
    @apply relative bg-transparent font-normal text-brand-primary-medium
      hover:bg-transparent hover:text-neutrals-lightgrey-dark hover:filter-none;
    outline: transparent;
    text-transform: none;
    &::after {
      @apply inline-block absolute
        h-px  bottom-3 left-4
      bg-brand-primary-medium hover:bg-transparent hover:text-neutrals-lightgrey-dark hover:filter-none;
      content: "";
      width: calc(100% - 32px);
    }
  }
  &.-disabled {
    @apply opacity-50 bg-neutrals-lightgrey-darkest text-neutrals-lightgrey-lightest cursor-not-allowed;
  }
}
</style>
