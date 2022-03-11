<script lang="ts" setup>
interface Props {
  id?: string;
  class?: string;
  label?: string;
  valueModel?: string;
  error?: string;
  success?: string;
  hint?: string;
  validationMessages?: string;
  icon?: string;
  type?: string;
  actionIcon?: Function;
  required?: string;
  name?: string;
  index?: number;
  param?: any;
}
withDefaults(defineProps<Props>(), {
  valueModel: "",
  actionIcon: () => console.log("actionIcon"),
  index: 0,
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
</script>

<template>
  <div class="textfield-base">
    <label v-if="label" :for="`input-${id}`" class="label">{{ label }}</label>
    <div class="container-input">
      <Input
        :required="required"
        :value="valueModel"
        @update:value="emitValue"
        :class="error ? '-error' : !success ? '' : '-success'"
        :type="type"
        :name="name"
      >
        <template v-if="icon" v-slot:icon>
          <button
            @click.prevent="actionIcon(index, param)"
            class="icon-textfield"
          >
            <span
              class="iconify"
              :data-icon="icon"
              data-width="16"
              data-height="16"
            ></span>
          </button>
        </template>
      </Input>
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
  min-width: 272px;

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
