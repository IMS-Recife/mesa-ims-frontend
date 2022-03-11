<script setup lang="ts"></script>

<template>
  <p class="link-small">
    <slot></slot>
  </p>
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
