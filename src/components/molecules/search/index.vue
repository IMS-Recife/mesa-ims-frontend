<script setup lang="ts">
const props = defineProps<{
  value?: string;
  class?: string;
  required?: any;
  name?: string;
  placeholder?: string;
  isSearchOpen?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:value", event: string): void;
  (e: "update:isSearchOpen", event: boolean): void;
}>();
</script>
<template>
  <div>
    <Input
      :type="type"
      :required="required"
      :name="name"
      :placeholder="placeholder"
      :value="value"
    />
  </div>
</template>

<style lang="scss"></style>
