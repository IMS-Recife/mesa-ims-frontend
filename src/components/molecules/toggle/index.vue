<script setup lang="ts">
interface Props {
  id?: string;
  label?: string;
  valueModel?: boolean;
  required?: boolean;
  textLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  valueModel: false,
  required: false,
});

const emit = defineEmits<{
  (e: "update:value", event: boolean): void;
}>();

const model = computed({
  get() {
    return props.valueModel;
  },
  set(value: any) {
    emit("update:value", value);
  },
});
</script>
<template>
  <div class="c-toggle">
    <span class="toggle__label">{{ textLabel }}</span>
    <label class="toggle">
      <input v-model="model" type="checkbox" class="toggle__system-toggle" />
      <span class="toggle__custom-toggle"></span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.c-toggle {
  @apply w-full flex justify-between items-center box-border my-2;
}

.toggle__label {
  @apply text-neutrals-darkgrey-medium font-display text-[20px] cursor-pointer;
  font-weight: 400;
}
.toggle__system-toggle {
  @apply h-[1px] w-[1px] overflow-hidden;
  display: none;
}
.toggle__custom-toggle {
  @apply w-[40px] h-[16px] relative border-solid border-1 border-neutrals-lightgrey-darkest block cursor-pointer;
  border-radius: 32px;
}
.toggle__custom-toggle::after {
  @apply w-[20px] h-[20px] relative border-solid border-1 border-neutrals-darkgrey-medium block bg-neutrals-lightgrey-darkest top-[-3px] left-[-3px] cursor-pointer;
  content: "";
  border-radius: 50%;
  transition: left 0.1s ease-in;
}

.toggle__system-toggle:checked + .toggle__custom-toggle::after {
  @apply left-[20px] border-solid border-1 border-brand-primary-medium bg-brand-primary-medium;
}

.toggle__system-toggle:disabled + .toggle__custom-toggle {
  opacity: 0.3;
}
</style>
