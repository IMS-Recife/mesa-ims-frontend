<script setup lang="ts"></script>

<template>
  <h1 class="title-h4">
    <slot></slot>
  </h1>
</template>

<style lang="scss">
.title-h4 {
  @apply text-brand-secondary-dark;
  font-family: Raleway;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  letter-spacing: 0, 5%;
  font-style: normal;

  @media (min-width: 768px) {
    font-family: Raleway;
    font-size: 20px;
    line-height: 28px;
    font-weight: 400;
    letter-spacing: 0, 5%;
    font-style: normal;
  }
}
</style>
