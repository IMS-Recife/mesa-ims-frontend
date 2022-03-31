<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@stores/auth";
import { useUIStore } from "@/stores/ui";

useHead({
  title: "IMS",
  meta: [{ name: "description", content: "IMS" }],
});

const auth = useAuthStore();
const router = useRouter();
const ui = useUIStore();
const gapi = window.gapi;
const fb = window.FB;

ui.clearChangeComponent();
if (!auth.keepOnline && auth.token.accessToken) {
  const SetIntervalExpToken = setInterval(() => {
    auth.verifyExp(auth.token.exp, SetIntervalExpToken);
  }, 5000);
}
function validateAuth(route: RouteLocationNormalized) {
  if (route.meta.requiresAuth && !auth.token.accessToken.length) {
    return router.replace("/signin");
  }
}
function googleInit(): void {
  gapi.client.init({
    clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    scope: "email",
  });
}
function useGoogle(): void {
  gapi.load("client", googleInit);
}
function facebookInit(): void {
  fb.init({
    appId: import.meta.env.VITE_APP_FACEBOOK_APP_ID,
    cookie: true,
    xfbml: true,
    version: "v3.0",
  });
}
router.beforeEach((to) => validateAuth(to));
onMounted(async () => {
  await nextTick();
  auth.setKeepOnline(true);
  auth.setExpired(false);
  validateAuth(router.currentRoute.value);
  facebookInit();
  useGoogle();
});
watch(
  () => auth.expired,
  (value) => {
    if (value) {
      ui.toggleLoading(true);
      setTimeout(() => {
        router.push("/signin");
        ui.toggleLoading(false);
      }, 1000);
    }
  },
  { immediate: true }
);
</script>

<template>
  <Snackbars />
  <router-view class="transition" />
  <div id="modals"></div>
  <Loader v-show="ui.isLoading" />
</template>

<style lang="scss">
:root {
  --width-scroll: 8px;
  --color-scroll-thumb: #00a19c;
  --color-scroll-track: #fbfbfb;
  --border: 8px;
}
body {
  ::-webkit-scrollbar {
    width: var(--width-scroll);
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--color-scroll-track);
    border-radius: var(--border);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--color-scroll-thumb);
    border-radius: var(--border);
  }
}

.leaflet-tile-container img {
  width: 514.5px !important;
  height: 514.5px !important;
}
</style>
