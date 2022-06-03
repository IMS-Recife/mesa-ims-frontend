<script setup lang="ts">
type Option = {
  value: string;
  label: string;
};
type Props = {
  options?: Option[] | [];
  class?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  formId: string;
};

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: "",
  value: "",
});

const emit = defineEmits<{
  (e: "update:value", event: string): void;
}>();
const model = computed({
  get() {
    return props.value;
  },
  set(value: any) {
    emit("update:value", value);
  },
});
</script>

<template>
  <select :required="props.required" :form="props.formId">
    <option>selecione</option>
    <option v-for="option in options" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<style lang="scss" scoped>
select {
  @apply max-h-9 min-w-11 px-4 py-4 box-border cursor-pointer;
  @apply bg-neutrals-lightgrey-lightest border-neutrals-lightgrey-dark outline-none;
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  font-size: 14px;
}

select > option {
  @apply bg-neutrals-lightgrey-lightest rounded-full;
}

.select-items {
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  font-size: 14px;
}

.select-selected {
  @apply bg-red-500;
  padding: 8px 16px;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
}

.select-selected:after {
  @apply text-brand-primary-medium;
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: transparent transparent transparent;
}

/* Point the arrow upwards when the select box is open (active): */
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}
</style>
