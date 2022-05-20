<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useUIStore } from "@/stores/ui";
import { useMapStore } from "@/stores/map";
import { ref } from "vue";

const ui = useUIStore();
const auth = useAuthStore();
const mapStore = useMapStore();

const isSidebarCollapsed = ref(true);
const unreadNotifications = ref();

watch(
  () => ui.isSidebarCollapsed,
  (val) => {
    isSidebarCollapsed.value = val;

    if (!val) {
      setTimeout(() => {
        ui.collapseSidebar();
      }, 12000);
    }
  },
  { immediate: true }
);
watch(
  () => ui.unreadNotifications,
  (val) => {
    unreadNotifications.value = val;
  },
  { immediate: true }
);

const menus = readonly([
  {
    name: "Início",
    to: "/home",
    icon: "mdi:home",
  },
  {
    name: "Visões",
    to: "/visions",
    icon: "mdi:layers",
  },
  {
    name: "Intervenções",
    to: "/interventions",
    icon: "mdi:vector-polyline",
  },
  {
    name: "Economia",
    to: "/economy",
    icon: "bx:bxs-dollar-circle",
  },
]);

function logoutSystem() {
  console.log("LOGOUT SYSTEM");
  mapStore.setNameClearZone("Zona Parque");
  auth.clearStore();
  mapStore.setIsDisabledMap(false);
  mapStore.clearMarkers(mapStore.isClearMap);
}

const userActions = readonly([
  {
    name: "Perfil",
    icon: "mdi:account-circle",
    funcionality: () => {
      console.log("Perfil");
    },
  },
  {
    name: "Notificações",
    icon: "mdi:bell",
    funcionality: ui.toggleNotificationsTab,
  },
  {
    name: "Pesquisar",
    icon: "mdi:magnify",
    funcionality: ui.toggleSearchInput,
  },
  {
    name: "Logout",
    icon: "mdi:logout",
    funcionality: logoutSystem,
  },
]);
</script>
<template>
  <nav class="sidebar-layout" :class="[isSidebarCollapsed ? 'w-16' : 'w-58']">
    <ul class="list">
      <li class="logo flex-row items-center hover:cursor-pointer">
        <router-link to="/home" class="link">
          <span
            class="iconify"
            data-icon="bx:bx-target-lock"
            data-width="24"
            data-height="24"
          ></span>
          <p v-if="!isSidebarCollapsed" class="pl-3">IMS</p>
        </router-link>
      </li>

      <li v-for="menu in menus" :key="menu.name" class="item">
        <router-link :to="menu.to" class="link">
          <span
            class="iconify text-current"
            :data-icon="menu.icon"
            data-width="24"
            data-height="24"
          >
          </span>
          <p v-if="!isSidebarCollapsed" class="pl-3">{{ menu.name }}</p>
        </router-link>
      </li>

      <hr class="divider" />

      <li v-for="userAction in userActions" :key="userAction.name" class="item">
        <button
          v-if="userAction.name === 'Notificações'"
          class="button-notification"
          @click="userAction.funcionality()"
        >
          <div class="notification-unread">
            <div class="notification-unread-circle"></div>

            <span
              class="iconify text-current"
              :data-icon="userAction.icon"
              data-width="24"
              data-height="24"
            ></span>
          </div>
          <p v-if="!isSidebarCollapsed" class="pl-3">{{ userAction.name }}</p>
        </button>

        <button
          v-else-if="userAction.name === 'Logout'"
          class="button"
          @click="userAction.funcionality()"
        >
          <span
            class="iconify text-current"
            :data-icon="userAction.icon"
            data-width="24"
            data-height="24"
          ></span>
          <p v-if="!isSidebarCollapsed" class="pl-3">{{ userAction.name }}</p>
        </button>
        <button v-else class="button" @click="userAction.funcionality()">
          <span
            class="iconify text-current"
            :data-icon="userAction.icon"
            data-width="24"
            data-height="24"
          ></span>
          <p v-if="!isSidebarCollapsed" class="pl-3">{{ userAction.name }}</p>
        </button>
      </li>
    </ul>
    <button
      class="circle hover:outline-none"
      @click="ui.collapseSidebar()"
      v-if="isSidebarCollapsed"
    >
      <span
        class="iconify text-brand-neutrals-darkgrey-dark"
        data-icon="mdi:chevron-right"
        data-width="24"
        data-height="24"
      ></span>
    </button>
    <button class="circle hover:outline-none" @click="ui.collapseSidebar()" v-else>
      <span
        class="iconify text-brand-neutrals-darkgrey-dark"
        data-icon="mdi:chevron-left"
        data-width="24"
        data-height="24"
      ></span>
    </button>
  </nav>
</template>

<style lang="scss">
.sidebar-layout {
  @apply fixed h-screen top-0 duration-300 bg-neutrals-lightgrey-lightest z-21;
  box-shadow: 0px 0px 8px rgba(37, 37, 37, 0.16);
  border-radius: 0px 16px 16px 0px;

  .divider {
    @apply my-[25px] mx-[12px] border-neutrals-lightgrey-dark;
  }

  > .list {
    @apply h-screen;
    width: inherit;
  }

  > .list > .logo {
    @apply flex items-center mb-[53px] pt-[16px] text-neutrals-darkgrey-dark;

    > p {
      @apply text-[20px] font-normal leading-[28px];
    }

    > .link {
      @apply w-full py-4 px-5 flex items-center;
    }
  }

  > .list > .item {
    @apply flex items-center;

    &:hover {
      @apply bg-neutrals-lightgrey-light;
    }

    > .button-notification {
      @apply w-full py-4 px-5 flex items-center outline-none text-neutrals-darkgrey-medium;

      &:focus {
        @apply outline-none border-none;
      }

      &:hover {
        @apply text-brand-secondary-medium bg-neutrals-lightgrey-medium;
      }

      > .notification-unread {
        @apply w-[14px] h-[14px] relative self-start mr-2;

        > .notification-unread-circle {
          @apply rounded-full w-[8px] h-[8px] bg-feedbacks-warning-dark absolute top-1/3 left-full;
        }
      }
    }

    > .button {
      @apply w-full py-4 px-5 flex items-center outline-none text-neutrals-darkgrey-medium;

      &:focus {
        @apply outline-none border-none;
      }

      &:hover {
        @apply text-brand-secondary-medium bg-neutrals-lightgrey-medium;
      }
    }

    > .link {
      @apply w-full py-4 px-5 flex items-center text-brand-secondary-medium;

      &.router-link-active {
        @apply bg-brand-secondary-medium text-neutrals-lightgrey-lightest;
      }

      &:hover {
        @apply cursor-pointer bg-brand-secondary-medium text-neutrals-lightgrey-lightest;
      }
    }
  }

  > .circle {
    @apply w-[40px] h-[40px] rounded-full flex bg-neutrals-lightgrey-lightest ml-auto relative bottom-20 right-[-1em] flex justify-center items-center;

    &:hover {
      @apply cursor-pointer;
    }
  }
}
</style>
