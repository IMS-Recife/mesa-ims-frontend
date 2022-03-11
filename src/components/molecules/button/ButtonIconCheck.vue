<script lang="ts" setup>
interface Props {
  id?: string;
  path: string;
  alt?: string;
  width?: string;
  height?: string;
  action?: any;
}

withDefaults(defineProps<Props>(), {
  path: "",
  width: "40",
  height: "32",
});
</script>

<template>
  <div>
    <button
      class="button-icon-check"
      type="button"
      :style="`width:${width}; height: ${height};`"
      @click.prevent="$emit('action')"
    >
      <img :src="path" :alt="alt" />
      <span class="label-text">
        {{ alt }}
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.button-icon-check {
  @apply flex flex-col gap-3 items-center justify-center
    text-[12px] filter: drop-shadow-sm
    hover:brightness-110 hover:drop-shadow-lg border-transparent;
  outline: transparent !important;
}
.label-text {
  @apply flex justify-center text-[12px] text-neutrals-darkgrey-medium font-semibold;
}
</style>
