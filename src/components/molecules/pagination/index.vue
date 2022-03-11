<script setup lang="ts">
interface Props {
  currentPage: number;
  totalPages: number;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:currentPage", currentPage: number): void;
}>();

const updateCurrentPage = (currentPage: number): void => {
  emit("update:currentPage", currentPage);
};

watch(
  () => props.currentPage,
  (newCurrentPage: number) => {
    currentPage.value = newCurrentPage;
  }
);

const firstShownPages = ref([1, 2, 3, 4]);
const lastShownPages = ref([props.totalPages]);
const currentPage = ref(1);
</script>

<template>
  <div class="pagination-container">
    <div class="pagination-previous-wrapper">
      <button
        v-if="currentPage !== 1"
        class="arrow-button"
        @click="updateCurrentPage(props.currentPage - 1)"
      >
        <span
          class="iconify"
          data-icon="mdi:chevron-left"
          data-width="30px"
          data-height="30px"
        />
      </button>
      <button
        v-if="currentPage !== 1"
        class="pagination-previous"
        @click="updateCurrentPage(props.currentPage - 1)"
      >
        <Caption>Anterior</Caption>
      </button>
      <div v-else class="w-38"></div>
    </div>

    <div class="pagination-numbers-wrapper">
      <button
        class="pagination-number"
        :class="currentPage === page ? 'active-button' : ''"
        v-for="page in firstShownPages"
        :key="page"
        @click="updateCurrentPage(page)"
      >
        <Caption>{{ page }}</Caption>
      </button>
      <button class="pagination-number" v-if="totalPages > 4">
        <Caption>...</Caption>
      </button>
      <button
        class="pagination-number"
        :class="currentPage === page ? 'active-button' : ''"
        v-for="page in lastShownPages"
        :key="page"
        @click="updateCurrentPage(page)"
      >
        <Caption>{{ page }}</Caption>
      </button>
    </div>

    <div class="pagination-next-wrapper">
      <button
        v-if="currentPage !== totalPages"
        class="pagination-next"
        @click="updateCurrentPage(props.currentPage + 1)"
      >
        <Caption>Próximo</Caption>
      </button>

      <button
        v-if="currentPage !== totalPages"
        class="arrow-button"
        @click="updateCurrentPage(props.currentPage + 1)"
      >
        <span
          class="iconify"
          data-icon="mdi:chevron-right"
          data-width="30px"
          data-height="30px"
        />
      </button>
      <div v-else class="w-38"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination-container {
  @apply flex items-center text-neutrals-darkgrey-medium h-12;

  button {
    @apply px-4 py-2 rounded-md;

    &:hover {
      @apply bg-brand-primary-light text-neutrals-lightgrey-lightest;
    }
    &:focus {
      @apply outline-none;
    }

    &:active {
      @apply bg-brand-primary-dark text-neutrals-lightgrey-lightest;
    }
  }
  .active-button {
    @apply text-brand-primary-medium;

    border: 1px solid #00a14b;
  }

  .arrow-button {
    @apply flex items-center outline-none;
  }

  > .pagination-numbers-wrapper {
    @apply flex flex-row items-center;

    > .pagination-number {
      @apply mx-2 outline-none;
    }
  }

  > .pagination-previous-wrapper {
    @apply flex items-center w-38;

    > .pagination-previous {
      @apply mx-2 outline-none;
    }
  }

  > .pagination-next-wrapper {
    @apply flex items-center w-40;

    > .pagination-next {
      @apply mx-2 outline-none;
    }
  }
}
</style>
