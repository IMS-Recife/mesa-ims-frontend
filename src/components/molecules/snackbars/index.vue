<script setup lang="ts">
import { useUIStore } from "@/stores/ui";

const ui = useUIStore();
const snackbar = ref();
const icon = ref();

function closeSnackbar() {
  ui.setSnackbar(false);
}

watch(
  () => ui.snackbar.isOpen,
  (val) => {
    snackbar.value = ui.snackbar;

    if (snackbar.value.type === "success") {
      icon.value = "teenyicons:tick-outline";
    } else if (snackbar.value.type === "error") {
      icon.value = "mdi:alert-circle";
    } else if (snackbar.value.type === "info") {
      icon.value = "mdi:information-outline";
    }

    if (snackbar.value) {
      setTimeout(() => {
        ui.setSnackbar(false);
      }, 10000);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="snackbar-default"
    :class="`-${snackbar.isOpen ? snackbar.type : ''}`"
  >
    <span
      class="iconify icon-alert"
      :data-icon="icon"
      data-width="32"
      data-height="32"
    ></span>
    <div class="text">
      <div class="title">
        <h2>
          {{ snackbar.title }}
        </h2>
      </div>
      <div class="message">
        <p>
          {{ snackbar.message }}
        </p>
      </div>
    </div>
    <button @click.prevent="closeSnackbar" class="icon-close">
      <span
        class="iconify"
        data-icon="mdi:close"
        data-width="16"
        data-height="16"
      ></span>
    </button>
  </div>
</template>

<style lang="scss">
.snackbar-default {
  @apply border-1 absolute top-[-100%] duration-[1s];
  left: 50%;
  z-index: 9999;
  background-color: #fff;
  color: #fff;
  > svg {
    color: #fff;
  }
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 420px;
  min-height: 76px;
  border-radius: 8px;

  &.-success {
    @apply border-feedbacks-positive-medium top-[5%] duration-800 text-neutrals-darkgrey-dark;
    > svg {
      @apply text-feedbacks-positive-medium;
    }
  }
  &.-error {
    @apply border-feedbacks-negative-medium top-[5%] duration-800 text-neutrals-darkgrey-dark;
    > svg {
      @apply text-feedbacks-negative-medium;
    }
  }
  &.-info {
    @apply border-feedbacks-warning-medium top-[5%] duration-800 text-neutrals-darkgrey-dark;
    > svg {
      @apply text-feedbacks-warning-medium;
    }
  }
  > .title {
  }
  > .text {
    width: 320px;
    font-size: 14px;
    padding: 16px 0;
  }
  > .icon-close {
    position: absolute;
    top: 5px;
    right: 10px;
    margin: 0;
    padding: 0;
    @apply border-none;
    background-color: transparent;
    cursor: pointer;
    z-index: 10;
  }
}
</style>
