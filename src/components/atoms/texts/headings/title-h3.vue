<script setup lang="ts"></script>

<template>
  <h1 class="title-h3">
    <slot></slot>
  </h1>
</template>

<style lang="scss" scoped>
.title-h3 {
  font-family: Raleway;
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
  letter-spacing: 0, 5%;
  font-style: normal;

  @media (min-width: 768px) {
    font-family: Raleway;
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    letter-spacing: 0, 5%;
    font-style: normal;
  }
}
</style>
