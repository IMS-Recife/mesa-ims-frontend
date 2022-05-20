<script setup lang="ts">
import { Project } from '@/@types';

  interface Props {
    projects?: Project[];
  }
  const props = defineProps<Props>();

  onBeforeMount(() => {
    console.log(props.projects);
  });
</script>

<template>
  <div class="pb-3 w-min h-min">
    <div class="modal-container">

      <div class="modal-content">
        <header>

        </header>

        <main>
          <ProjectList :projects="props.projects" />       
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

    > .modal-content {
      > header {
        @apply mb-[12px];

      }

      > main {
        @apply mb-[12px] text-neutrals-darkgrey-medium;
      }
    }
  }

</style>
