<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
const router = useRouter();

const ui = useUIStore();
const notifications = [
  {
    message: "Atualização do trecho Sul do Parque Capibaribe",
    date: "30/08/2021",
  },
  {
    message: "Atualização do trecho Sul do Parque Capibaribe",
    date: "30/08/2021",
  },
  {
    message: "Atualização do trecho Sul do Parque Capibaribe",
    date: "30/08/2021",
  },
  {
    message: "Atualização do trecho Sul do Parque Capibaribe",
    date: "30/08/2021",
  },
];
</script>
<template>
  <div class="notifications-container">
    <header>
      <h1 class="title">
        <span
          class="iconify bell-icon"
          data-icon="mdi:bell"
          data-width="24"
          data-height="24"
        />
        Notificações
      </h1>

      <button @click="ui.toggleNotificationsTab" class="icon-close">
        <span
          class="iconify"
          data-icon="mdi:close"
          data-width="24"
          data-height="24"
        ></span>
      </button>
    </header>

    <hr />

    <div
      v-for="(notification, index) in notifications"
      :key="index"
      class="notifications-list"
    >
      <Notification :message="notification.message" :date="notification.date" />
    </div>

    <div class="action-buttons-wrapper">
      <button class="action-button">Marcar todas como lidas</button>
      <button class="action-button" @click="router.push(`/notifications`)">
        Ver todas as notificações
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.notifications-container {
  z-index: 502;
  @apply flex flex-col items-start px-[200px] py-10 bg-neutrals-lightgrey-light top-0 h-min w-full shadow-md;

  > header {
    @apply flex content-center justify-between text-brand-secondary-medium w-full;

    > .title {
      @apply flex items-center justify-center text-2xl;

      > .bell-icon {
        @apply mr-2;
      }
    }
    .icon-close {
      @apply outline-none;
    }
  }

  > hr {
    @apply border border-neutrals-lightgrey-medium mt-5 w-full;
  }

  > .notifications-list {
    @apply w-full px-3;
  }

  > .action-buttons-wrapper {
    @apply flex justify-between w-full;

    > .action-button {
      @apply text-brand-primary-medium underline outline-none;
    }
  }
}
</style>
