<script setup lang="ts">
  interface Props {
    href: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    href: "/"
  });
</script>

<template>
  <router-link :to="props.href">
    <p class="link-small">
      <slot></slot>
    </p>
  </router-link>
</template>

<style lang="scss" scoped>
.link-small {
  @apply text-brand-primary-medium;
  text-decoration: underline;
  cursor: pointer;
  font-family: Roboto;
  font-size: 12px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: 0, 5%;
  font-style: underline;
}
</style>
