<script lang="ts" setup>
interface Props {
  path?: string;
  goBack?: boolean;
  link?: string;
  title?: string;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  path: "",
  goBack: false,
  link: "",
  title: "",
  message: "",
});
</script>

<template>
  <div class="feedback-base">
    <div v-if="goBack" class="action-top-feedback">
      <slot name="goback"></slot>
    </div>
    <div class="content-image">
      <img :src="path" alt="" srcset="" />
    </div>
    <legend>
      <h3>{{ title }}</h3>
      <p>
        {{ message }}
      </p>
    </legend>
    <div class="action-bottom-feedback">
      <slot name="linkfooter"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.feedback-base {
  @apply flex flex-col items-center max-w-[288px] border-brand-secondary-dark w-288px h-full;

  > .action-top-feedback {
    @apply absolute top-5 left-0;
  }

  > .action-bottom-feedback {
    @apply relative bottom-5;
  }
  > .content-image {
    @apply flex flex-col items-center justify-center w-[176px] h-[176px];
    > img {
      @apply w-full h-full;
    }
  }

  > legend {
    @apply flex flex-col w-full h-full my-4;
    > h3 {
      @apply text-2xl text-brand-primary-dark;
    }
    > p {
      @apply text-sm;
    }
  }
}
</style>
