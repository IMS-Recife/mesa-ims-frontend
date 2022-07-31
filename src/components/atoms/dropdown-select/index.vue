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
const options = ref(props.options);
const inputValue = ref("");

const emit = defineEmits<{
  (e: "update:selected", event: string): void;
}>();

const filterOptions = (value: any) => {
  if (value.data) {
    inputValue.value = inputValue.value + value.data.toLowerCase();
  } else {
    inputValue.value = "";
  }
  options.value = props.options.filter((option) => {
    return option.label.toLowerCase().includes(inputValue.value);
  });
};

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
      <input
        class="select-input"
        type="text"
        @click="showOptions = true"
        @input="filterOptions"
      />
    </div>
    <button v-if="!showOptions" @click="showDropdownOptions">
      <span class="iconify arrow" data-icon="mdi:chevron-down" data-width="28" />
    </button>
    <button v-else @click="showDropdownOptions">
      <span class="iconify arrow" data-icon="mdi:chevron-up" data-width="28" />
    </button>
  </div>
  <div class="dropdown-options" v-if="showOptions">
    <button
      class="dropdown-option"
      v-for="option in options"
      @click="selectOption(option)"
    >
      <TextBodySmall class="label-text">{{ option.label }}</TextBodySmall>
    </button>
  </div>
</template>

<style scoped>
.dropdown-container {
  @apply relative flex items-center justify-start p-0;
  @apply h-max max-h-9 min-w-[200px] pb-3 border-1 rounded-lg border-neutrals-lightgrey-dark;

  > button > .arrow {
    @apply absolute right-1 top-1;
    @apply text-brand-primary-medium;
  }

  .dropdown-content {
    > .select-input {
      @apply border-none outline-none bg-transparent;
      @apply pl-3 pt-5;
      @apply text-neutrals-darkgrey-lightest;
      @apply h-[38px] w-full;
      @apply cursor-pointer;

      > .label-text {
        @apply ml-3 text-neutrals-darkgrey-lightest;
      }
    }
  }
}

.dropdown-options {
  @apply absolute z-2000 flex flex-col overflow-y-scroll mt-1;
  @apply max-h-50;
  @apply shadow-md rounded-md bg-neutrals-lightgrey-lightest;

  > .dropdown-option {
    @apply flex flex-col items-start justify-center px-3 py-2;
    @apply h-full w-[205px];
    @apply cursor-pointer hover:bg-neutrals-lightgrey-light;
    @apply text-neutrals-darkgrey-lightest hover:text-neutrals-darkgrey-light;
    > .label-text {
      @apply text-left;
    }
  }
}
</style>
