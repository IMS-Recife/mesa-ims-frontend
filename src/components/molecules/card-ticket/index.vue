<script setup lang="ts">
interface Props {
  title?: string;
  text?: string;
  actived?: boolean;
  iconType?: string;
  iconStatus?: string;
}

withDefaults(defineProps<Props>(), {
  actived: false,
  title: "Cidadão",
  text: "Sei mais sobre a minha cidade e os projeto do meu bairro.",
  iconType: "bi:person-circle",
  iconStatus: "charm:tick",
});
</script>

<template>
  <div class="card-ticket-base" :class="actived ? 'actived' : ''">
    <div class="card-ticket-content">
      <div class="header" :class="actived ? 'actived' : ''">
        <div class="title">
          <span class="iconify" :data-icon="iconType" data-width="24"></span>
          <p>{{ title }}</p>
        </div>
        <span class="iconify" :data-icon="iconStatus" data-width="24"></span>
      </div>
      <div class="text">
        <p>
          {{ text }}
        </p>
      </div>
    </div>
    <div class="card-ticket-bar" :class="actived ? 'actived' : ''"></div>
  </div>
</template>

<style lang="scss">
.card-ticket-base {
  @apply w-328px h-116px flex items-center border-neutrals-lightgrey-lightest bg-neutrals-lightgrey-lightest bg-transparent border-solid  border cursor-pointer;
  border-radius: 8px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  transition: ease-out 0.7s;
  &.actived {
    @apply border-brand-secondary-lightest border-solid  border;
  }
}

.card-ticket-content {
  @apply p-6;
  > .header {
    @apply flex items-center justify-between mb-4;
    > .title {
      @apply flex items-center gap-2;
      > svg {
        transition: ease-out 0.7s;
      }
      > p {
        @apply font-display text-neutrals-darkgrey-dark text-[20px];
      }
    }
    > svg {
      transition: ease-out 0.7s;
      @apply opacity-0;
    }

    &.actived {
      > .title {
        @apply flex items-center gap-2;
        > svg {
          @apply text-brand-primary-medium;
        }
        > p {
          @apply font-display text-brand-primary-medium text-[20px];
        }
      }
      > svg {
        @apply text-brand-primary-medium opacity-100;
      }
    }
  }

  > .text {
    @apply text-neutrals-darkgrey-dark text-[14px];
  }
}

.card-ticket-bar {
  @apply absolute bg-neutrals-lightgrey-medium w-10px h-80px
  content: "";
  border-radius: 0px 8px 8px 0px;
  transition: ease-out 0.7s;
  &.actived {
    @apply bg-brand-primary-light;
  }
}
</style>
