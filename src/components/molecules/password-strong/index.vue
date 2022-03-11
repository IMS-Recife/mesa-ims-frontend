<script setup lang="ts">
defineProps<{
  password?: string;
}>();

function testPasswordStrong(password: any) {
  const strongRegex = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  const mediumRegex = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})"
  );

  let bars;

  const returnTest = strongRegex.test(password)
    ? "strong"
    : mediumRegex.test(password)
    ? "medium"
    : "weak";

  switch (returnTest) {
    case "strong":
      bars = ["strong", "strong", "strong"];
      break;
    case "medium":
      bars = ["average", "average", "neutral"];
      break;
    case "weak":
      bars = ["weak", "neutral", "neutral"];
      break;
  }

  return bars;
}
</script>

<template>
  <div v-if="password" class="password-strong-base">
    <span
      v-for="(item, index) in testPasswordStrong(password)"
      :key="index"
      :class="item"
    ></span>
  </div>
</template>
<style lang="scss">
.password-strong-base {
  @apply flex flex-row mt-2;
  @apply justify-end;

  > span {
    @apply mr-1 mt-1 bg-neutrals-darkgrey-lightest;
    width: 24px;
    height: 2px;
    border-radius: 2px;

    &.weak {
      @apply bg-feedbacks-negative-medium;
    }
    &.average {
      @apply bg-feedbacks-warning-medium;
    }
    &.strong {
      @apply bg-feedbacks-positive-medium;
    }
    &.netural {
      @apply bg-neutrals-darkgrey-lightest;
    }
  }
}
</style>
