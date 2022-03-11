<script setup lang="ts"></script>

<template>
  <p class="text-body-small">
    <slot></slot>
  </p>
</template>

<style lang="scss" scoped>
.text-body-small {
  font-family: Roboto;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: 0, 5%;
  font-style: normal;

  @media (min-width: 768px) {
    font-family: Roboto;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    letter-spacing: 0, 5%;
    font-style: normal;
  }
}
</style>
