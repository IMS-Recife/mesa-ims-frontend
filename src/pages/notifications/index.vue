<route lang="yaml">
name: notifications
meta:
  layout: default
</route>
<script setup lang="ts">
const routes = [
  {
    path: "/home",
    icon: "mdi-home",
    name: "Início",
    currentPath: false,
  },
  {
    path: "/notifications",
    name: "Todas as notificações",
    currentPath: true,
  },
];
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
const ready = ref(false);
onMounted(() => {
  ready.value = true;
});
</script>
<template>
  <div class="notifications-page">
    <header class="page-header">
      <Breadcrumbs class="z-10" :routes="routes" />
      <h1 class="page-title">Notificações</h1>
      <div class="mask"></div>
    </header>
    <main class="notifications-container">
      <div
        v-for="(notification, index) in notifications"
        :key="index"
        class="notifications-list"
      >
        <Notification
          :message="notification.message"
          :date="notification.date"
        />
      </div>

      <button class="action-button">Marcar todas como lidas</button>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.notifications-page {
  @apply w-screen h-screen overflow-hidden absolute;

  > .page-header {
    @apply flex relative flex-col w-screen h-[300px] px-[150px] py-10;
    background-image: url(@/assets/images/notifications-page-map.png);
    background-repeat: no-repeat;
    background-size: cover;

    > .page-title {
      @apply text-[40px] text-brand-secondary-medium mt-auto z-10;
    }

    > .mask {
      @apply absolute top-0 left-0 w-full h-full bg-brand-secondary-lightest opacity-20;
    }
  }

  > .notifications-container {
    @apply flex flex-col items-start px-[200px] py-10 bg-neutrals-lightgrey-light h-full w-full shadow-2xl;
    > .notifications-list {
      @apply w-full px-3;
    }

    > .action-button {
      @apply text-brand-primary-medium underline outline-none;
    }
  }
}
</style>
