<script setup lang="ts">
type Props = {
  placeholder?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  selected?: {
    value: string;
    label: string;
  };
};

var input = document.getElementById("dropdown-input");

const props = withDefaults(defineProps<Props>(), {
  options: [],
  selected: {
    value: "",
    label: "",
  },
});
const options = ref(props.options);
const shownOptions = ref(options.value);
const inputValue = ref("");
const showOptions = ref(false);
const selectedOption = ref({
  label: "Situação",
  value: "",
});

const emit = defineEmits<{
  (e: "update:selected", event: string): void;
}>();

const createOption = (label: any) => {
  const newOption: any = {
    value: label,
    label: label,
  };
  options.value = [...options.value, newOption];
  showOptions.value = false;
};

const filterOptions = (value: any) => {
  if (value.data) {
    inputValue.value = inputValue.value + value.data;
  } else {
    inputValue.value = inputValue.value.slice(0, -1);
  }

  // inputValue.value = "";
  const optionsToFilter = options.value;
  shownOptions.value = optionsToFilter.filter((option) => {
    return option.label.toLowerCase().includes(inputValue.value.toLowerCase());
  });
};

const showDropdownOptions = () => {
  showOptions.value = !showOptions.value;
};

const selectOption = (option: any) => {
  showDropdownOptions();
  selectedOption.value = option;
  inputValue.value = option.label;
  emit("update:selected", option.value);
};
</script>

<template>
  <div class="dropdown-container">
    <div class="dropdown-content">
      <input
        autocomplete="off"
        :placeholder="props.placeholder"
        id="dropdown-input"
        class="select-input"
        type="text"
        :value="inputValue"
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
      v-for="option in shownOptions"
      @click="selectOption(option)"
    >
      <TextBodySmall class="label-text">{{ option.label }}</TextBodySmall>
    </button>
    <button v-if="inputValue" class="dropdown-option" @click="createOption(inputValue)">
      <TextBodySmall class="label-text">Criar Opção "{{ inputValue }}"</TextBodySmall>
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
