<script setup lang="ts">
interface Props {
  href: string;
}
const props = withDefaults(defineProps<Props>(), {
  href: "/",
});
onBeforeMount(() => {
  console.log("HREF", props.href);
});
</script>

<template>
  <a :href="props.href" :target="props.href === '/' ? '' : '_blank'">
    <p class="link-small">
      <slot></slot>
    </p>
  </a>
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
