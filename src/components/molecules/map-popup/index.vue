<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="pb-3 w-min h-min">
    <div class="map-popup-container">
      <aside class="popup-side-flag" />

      <div class="popup-content">
        <header>
          <Overline class="-map-popup-title">{{ props.title }}</Overline>
        </header>

        <main>
          <slot></slot>
        </main>
      </div>

      <div class="popup-tail" />

      <aside class="popup-arrow">
        <button>
          <span
            class="iconify"
            data-icon="mdi:chevron-right"
            data-width="24"
            data-height="24"
          />
        </button>
      </aside>
    </div>
  </div>
</template>

<style lang="scss">
.map-popup-container {
  @apply relative flex flex-row py-5 px-8 bg-neutrals-lightgrey-light rounded-lg z-999 w-100;

  > .popup-side-flag {
    @apply absolute left-0 top-0 w-[8px] h-full bg-brand-secondary-medium rounded-l-lg;
  }

  > .popup-tail {
    @apply absolute -bottom-2 w-4 h-4 bg-neutrals-lightgrey-light z-999 transform rotate-45;
    left: calc(50%);
  }

  > .popup-arrow {
    @apply absolute w-[24px] right-0 text-brand-secondary-medium p-0;
    top: calc(50% - 12px);

    > button {
      @apply outline-none;
    }
  }
}
.-map-popup-title {
  @apply text-brand-secondary-medium uppercase;
  line-height: 20px;
}

.-map-popup-content {
  @apply text-neutrals-darkgrey-medium;
}
</style>
