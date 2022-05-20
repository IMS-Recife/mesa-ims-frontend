<script setup lang="ts">
import { Project } from '@/@types';

  interface Props {
    projects?: Project[];
  }
  const props = defineProps<Props>();

</script>

<template>
  <ul>
    <li 
      v-for="project in props.projects"
      class="project-card"
    >
      <div class="project-infos">
        <Overline
          class="project-name"
        >
          {{ project.name }}
        </Overline>

        <TextSmall
          class="project-date"
        >
          {{ project.created_at }}
        </TextSmall>
      </div>
      <div class="project-actions">
        <button>
          <span 
            class="iconify"
            data-icon="mdi:trash-can"
            data-width="20"
            data-height="20"
          />
        </button>
      </div>

      <hr>
    </li>  
  </ul>
</template>

<style lang="scss" scoped>

  ul {
    @apply flex flex-col;

    > .project-card {
      @apply flex items-stretch;
      @apply w-full;

      > .project-infos {
        @apply flex flex-col;

        > .project-name {
          @apply text-brand-secondary-dark;
        }

        > .project-date {
          @apply text-neutrals-darkgrey-medium;
        }
      }

      > .project-actions {
        @apply text-neutrals-darkgrey-medium;
      }
    }

  }

</style>