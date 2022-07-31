<script setup lang="ts">
type Props = {
  value?: string;
  class?: string;
  type?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
  maxNumber?: string;
  minNumber?: string;
  border?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: "",
  value: "",
  maxNumber: "100",
  border: true,
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
  <input
    v-model="model"
    :class="`input-base ${$props.class}`"
    :type="props.type"
    :required="required"
    :name="name"
    :placeholder="placeholder"
    lang="pt-BR"
    :max="props.maxNumber"
    min="0"
  />
  <slot name="icon"> </slot>
</template>

<style lang="scss">
.input-base {
  @apply max-h-9 px-4 py-4 box-border cursor-pointer;
  @apply border-1 border-neutrals-lightgrey-dark rounded-lg;
  font-size: 14px;

  width: 100%;

  &.-error {
    @apply border-feedbacks-negative-light;
  }

  &.-success {
    @apply border-feedbacks-positive-light;
  }

  &:disabled {
    @apply bg-neutrals-lightgrey-light;
  }

  &:is(:focus, :focus-visible, :focus-within, :active) {
    @apply bg-neutrals-lightgrey-light;
    box-shadow: 0px 0px 0px 1px #7ac8c5;
    outline: transparent;
  }
}

input[type="date"]::-webkit-calendar-picker-indicator {
  @apply text-brand-primary-dark;
}
</style>
