<script setup lang="ts"></script>

<template>
  <h1 class="title-h2">
    <slot></slot>
  </h1>
</template>

<style lang="scss" scoped>
.title-h2 {
  font-family: Raleway;
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  letter-spacing: 0, 5%;
  font-style: normal;

  @media (min-width: 768px) {
    font-family: Raleway;
    font-size: 32px;
    line-height: 40px;
    font-weight: 700;
    letter-spacing: 0, 5%;
    font-style: normal;
  }
}
</style>
