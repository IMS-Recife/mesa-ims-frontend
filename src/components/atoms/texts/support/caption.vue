<script setup lang="ts"></script>

<template>
  <h1 class="caption">
    <slot></slot>
  </h1>
</template>

<style lang="scss" scoped>
.caption {
  font-family: Roboto;

  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
  letter-spacing: 0, 5%;
  font-style: normal;
}
</style>
