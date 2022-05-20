<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="pb-3 w-min h-min">
    <div class="modal-container">
      <aside class="modal-side-flag" />

      <div class="modal-content">
        <header>
          <TitleH3 class="modal-title">
            {{ props.title }}
          </TitleH3>
        </header>

        <main>
          <slot name="default"></slot>
        </main>

        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modal-container {
    @apply relative flex flex-row z-999 absolute right-[3px] mt-2;
    @apply py-5 px-8 bg-neutrals-lightgrey-light rounded-lg w-70;

    > .modal-side-flag {
      @apply absolute left-0 top-0 w-[8px] h-full bg-brand-secondary-medium rounded-l-lg;
    }





    > .modal-content {
      > header {
        @apply mb-[12px];

        > .modal-title {
          @apply text-brand-secondary-medium;
          line-height: 20px;
        }
      }

      > main {
        @apply mb-[12px] text-neutrals-darkgrey-medium;
      }
    }
  }

</style>
