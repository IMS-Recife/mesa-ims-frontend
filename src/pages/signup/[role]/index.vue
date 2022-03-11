<route lang="yaml">
name: role
meta:
  layout: gateway
  requiresAuth: false
</route>

<script setup lang="ts">
import feedbackCreateUser from "@/assets/images/feedback-positive.svg";
import { useUIStore } from "@/stores/ui";

const ui = useUIStore();
</script>

<template>
  <Feedback
    v-if="ui.dataChangeComponent.includes('feedbackCreateUser')"
    :title="'A sua conta foi criada com sucesso!'"
    :message="'Agora você pode ter acesso ao IMS.'"
    :path="feedbackCreateUser"
    class="component-feedback"
  >
    <template #linkfooter>
      <div class="link-go-login">
        <Button
          class="-link"
          @click.prevent="$router.push({ path: '/signin' })"
        >
          Logar no IMS
        </Button>
      </div>
    </template>
  </Feedback>
  <AdditionalData v-else />
</template>

<style lang="scss" scoped>
.component-feedback {
  @apply pt-24;
}
</style>
