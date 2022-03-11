<route lang="yaml">
name: recovery-password
meta:
  layout: gateway
</route>

<script setup lang="ts">
import feedbackchangepassword from "@/assets/images/feedback-positive.svg";
import { useUIStore } from "@/stores/ui";

const ui = useUIStore();
</script>

<template>
  <Feedback
    v-if="ui.dataChangeComponent.includes('feedbackRecoveryPassword')"
    :title="'A senha foi redefinida!'"
    :message="'Agora você pode ter acesso novamente ao IMS.'"
    :path="feedbackchangepassword"
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
  <Recoverypassword
    v-else
    class="component-recoverypassword"
  ></Recoverypassword>
</template>

<style lang="scss">
.component-recoverypassword {
  @apply pt-8;
}
.component-feedback {
  @apply pt-24;
}

.link-go-login {
  @apply flex justify-center items-center  text-1xl;
}
</style>
