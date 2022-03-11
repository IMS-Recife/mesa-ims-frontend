<script setup lang="ts"></script>

<template>
  <p class="text-body-medium">
    <slot></slot>
  </p>
</template>

<style lang="scss" scoped>
.text-body-medium {
  font-family: Roboto;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: 0, 5%;
  font-style: normal;

  @media (min-width: 768px) {
    font-family: Roboto;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    letter-spacing: 0, 5%;
    font-style: normal;
  }
}
</style>
