<script setup lang="ts"></script>

<template>
  <label class="label">
    <slot></slot>
  </label>
</template>

<style lang="scss" scoped>
.label {
  font-family: Roboto;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 2%;
  font-style: normal;
}
</style>
