<script setup lang="ts">
type Props = {
  options: Array<{
    value: string;
    label: string;
  }>;
  selected?: {
    value: string;
    label: string;
  };
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:selected", event: string): void;
}>();

const showOptions = ref(false);
const selectedOption = ref({
  label: "Situação",
  value: "",
});

const showDropdownOptions = () => {
  showOptions.value = !showOptions.value;
};

const selectOption = (option: any) => {
  selectedOption.value = option;
  emit("update:selected", option.value);
};
</script>

<template>
  <div class="dropdown-container">
    <div class="dropdown-content">
      <div class="selected-option">
        <TextBodySmall class="label-text">{{ selectedOption.label }}</TextBodySmall>
      </div>

      <div class="dropdown-options" v-if="showOptions">
        <button
          class="dropdown-option"
          v-for="option in props.options"
          @click="selectOption(option)"
        >
          <TextBodySmall class="label-text">{{ option.label }}</TextBodySmall>
        </button>
      </div>
    </div>

    <button v-if="!showOptions" @click="showDropdownOptions">
      <span class="iconify arrow" data-icon="mdi:chevron-down" data-width="28" />
    </button>
    <button v-else @click="showDropdownOptions">
      <span class="iconify arrow" data-icon="mdi:chevron-up" data-width="28" />
    </button>
  </div>
</template>

<style scoped>
.dropdown-container {
  @apply relative flex items-center justify-start overflow-y-scroll;
  @apply h-max max-h-36 min-w-[200px] border-1 rounded-md border-neutrals-lightgrey-dark;

  > button > .arrow {
    @apply absolute right-1 top-1;
    @apply text-brand-primary-medium;
  }

  .dropdown-content {
    > .selected-option {
      @apply flex flex-col items-start justify-center;
      @apply h-[38px] px-2 w-full;
      @apply cursor-pointer;

      > .label-text {
        @apply ml-3 text-neutrals-darkgrey-lightest;
      }
    }
  }
}

.dropdown-options {
  @apply flex flex-col;

  > .dropdown-option {
    @apply flex flex-col items-start justify-center;
    @apply h-[38px] px-2 w-[200px];
    @apply cursor-pointer hover:bg-neutrals-lightgrey-light;
    @apply text-neutrals-darkgrey-lightest hover:text-neutrals-darkgrey-light;
    > .label-text {
      @apply ml-3;
    }
  }
}
</style>
