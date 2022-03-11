<script setup lang="ts"></script>

<template>
  <h1 class="title-h1">
    <slot></slot>
  </h1>
</template>

<style lang="scss" scoped>
.title-h1 {
  font-family: Raleway;
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: 0, 5%;
  font-style: normal;

  @media (min-width: 768px) {
    font-family: Raleway;
    font-size: 40px;
    line-height: 48px;
    font-weight: 700;
    letter-spacing: 0, 5%;
    font-style: normal;
  }
}
</style>
