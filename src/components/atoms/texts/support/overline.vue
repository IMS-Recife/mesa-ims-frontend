<script setup lang="ts"></script>

<template>
  <h1 class="overline">
    <slot></slot>
  </h1>
</template>

<style lang="scss" scoped>
.overline {
  font-family: Roboto;
  font-size: 12px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0, 5%;
  font-style: normal;
  text-decoration: none;
}
</style>
