<script setup lang="ts"></script>

<template>
  <p class="text-body-large">
    <slot></slot>
  </p>
</template>

<style lang="scss" scoped>
.text-body-large {
  font-family: Roboto;
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
  letter-spacing: 0, 5%;
  font-style: normal;

  @media (min-width: 768px) {
    font-family: Roboto;
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
    letter-spacing: 0, 5%;
    font-style: normal;
  }
}
</style>
