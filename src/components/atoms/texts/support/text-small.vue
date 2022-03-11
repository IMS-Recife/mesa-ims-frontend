<script setup lang="ts"></script>

<template>
  <h1 class="text-small">
    <slot></slot>
  </h1>
</template>

<style lang="scss" scoped>
.text-small {
  font-family: Roboto;
  font-size: 12px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: 2%;
  font-style: normal;
}
</style>
