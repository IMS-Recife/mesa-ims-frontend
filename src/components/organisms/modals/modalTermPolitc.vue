<script lang="ts" setup>
import { useUIStore } from "@/stores/ui";
interface Props {
  modalName: string;
  alt: string;
  class?: string;
  title: string;
  subtitle?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modalName: "teste",
  alt: "Modal generico",
});
const ui = useUIStore();
const isOpen = computed(() => ui.isModalOpen(props.modalName));
function closeModal() {
  ui.toggleModal(props.modalName);
}
const isReady = ref(false);
onMounted(() => (isReady.value = true));
</script>

<template>
  <div v-if="isReady">
    <teleport to="#modals">
      <article
        v-if="isOpen"
        :id="`modal-${modalName}`"
        class="modal-feedback-core"
        :class="`${$props.class ?? ''}`"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`modal-header-${modalName}`"
        tabindex="0"
        @keyup.esc="closeModal"
      >
        <h1 :id="`modal-header-${modalName}`" class="sr-only">
          {{ alt }}
        </h1>
        <main class="modal">
          <div class="header">
            <h1 class="title">
              {{ title }}
            </h1>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeModal"
            >
              <span
                class="iconify"
                data-icon="mdi:close"
                data-width="24"
              ></span>
            </button>
          </div>
          <p class="subtitle">
            {{ subtitle }}
          </p>
          <div class="content">
            <slot name="content" />
          </div>
          <div class="footer">
            <slot name="footer" />
          </div>
        </main>
      </article>
    </teleport>
  </div>
</template>
<style lang="scss">
.modal-feedback-core {
  @apply flex flex-col justify-center items-center
    fixed top-0 left-0
    h-screen w-screen;
  z-index: 503;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  > .modal {
    @apply flex flex-col items-center relative h-460px w-600px bg-white shadow-lg text-neutrals-darkgrey-dark  font-display;
    border-radius: 8px;
  }
  > .modal {
    > .header {
      @apply flex flex-row items-start justify-between w-full p-6;
      > .title {
        @apply font-display text-[20px];
      }
    }
    > .content {
      @apply flex flex-col items-center justify-center w-full pt-12 pb-6 pl-6 pr-16 overflow-y-scroll;
    }
    > .footer {
      @apply flex flex-row items-start justify-between w-full p-6 gap-12;
    }
  }
}
</style>
