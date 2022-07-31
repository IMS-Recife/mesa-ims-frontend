<script lang="ts" setup>
interface Props {
  id?: string;
  class?: string;
  label?: string;
  placeholder?: string;
  valueModel?: string | number;
  error?: string;
  success?: string;
  hint?: string;
  validationMessages?: string;
  icon?: string;
  type?: string;
  actionIcon?: Function;
  required?: boolean;
  name?: string;
  index?: number;
  param?: any;
  minWidth?: string;
  labelColor?: "primary" | "secondary" | "tertiary" | "neutral";
  options: Array<{
    value: string;
    label: string;
  }>;
}
const props = withDefaults(defineProps<Props>(), {
  valueModel: "",
  actionIcon: () => console.log("actionIcon"),
  index: 0,
  minWidth: "500px",
  labelColor: "neutral",
});
const emit = defineEmits<{
  (e: "update:value", event: string): void;
}>();

function emitValue(event: any) {
  const value = event;
  emit("update:value", value);
}

function showHint(hint?: string, error?: string, success?: string): boolean {
  return !!hint;
}

const labelColor = computed(() => {
  switch (props.labelColor) {
    case "primary":
      return "text-brand-primary-darkest";

    case "secondary":
      return "text-brand-secondary-darkest";

    case "tertiary":
      return "text-brand-tertiary-darkest";

    default:
      return "text-neutrals-darkgrey-dark";
  }
});

const textfieldVariance = computed(() => {
  return `min-w-[${props.minWidth}]`;
});
</script>

<template>
  <div class="textfield-base">
    <Label v-if="label" :for="`input-${id}`" class="label" :class="labelColor">
      {{ label }}
    </Label>
    <div class="container-input">
      <DropdownSelect @update:selected="emitValue" :options="props.options" />
    </div>
    <slot name="password-strong"></slot>

    <span v-if="showHint(hint, error, success)" class="hint">{{ hint }}</span>

    <span v-else-if="error" class="error">{{ error }}</span>
    <span v-else-if="success" class="success">{{ success }}</span>
  </div>
</template>
<style lang="scss">
.textfield-base {
  @apply flex flex-col my-6;

  @screen <smdt {
    @apply my-2;
  }

  > .label {
    @apply mb-1 text-left text-sm;
  }

  > .container-input {
    @apply relative;

    > .input {
      @apply w-full;
    }

    > .input ~ * {
      @apply absolute;
      top: calc(50% - 10px);
      right: calc(24px - 12px);
    }

    > .icon-textfield {
      position: absolute;
      width: 24px;
      height: 24px;
      right: 8px;
      top: 9px;
    }
  }

  > .hint {
    @apply mt-1 text-[12px] text-left select-none text-neutrals-darkgrey-dark;
    line-height: 24px;
    font-weight: 700;
  }

  > .error {
    @apply mt-1 text-sm text-left select-none;
    @apply text-feedbacks-negative-light font-bold;
  }

  > .success {
    @apply mt-1 text-sm text-left select-none;
    @apply text-feedbacks-positive-light font-bold;
  }
}
</style>
