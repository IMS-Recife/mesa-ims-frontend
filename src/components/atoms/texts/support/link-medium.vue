<script setup lang="ts"></script>

<template>
  <p class="link-suport-medium">
    <slot></slot>
  </p>
</template>

<style lang="scss" scoped>
.link-suport-medium {
  @apply text-brand-primary-medium
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: 0, 5%;
  text-decoration: underline;
  cursor: pointer;

  @media (min-width: 768px) {
    font-family: Roboto;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    letter-spacing: 0, 5%;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
