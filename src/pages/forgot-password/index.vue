<route lang="yaml">
name: forgot-password
meta:
  layout: gateway
</route>

<script setup lang="ts">
import feedbackemail from "@/assets/images/feedback-email-send.svg";
import { useUIStore } from "@/stores/ui";
import { forgotPassword } from "@services/auth";
const ui = useUIStore();
const email = ref("");

function emailResend(params: any) {
  email.value = params;
}

function reSendForgotPassword() {
  forgotPassword(email?.value)
    .then((data): any => {
      if (data.status === 200) {
        ui.setSnackbar(true, "", "Email reenviado com sucesso!", "success");
      }
    })
    .catch((err: any) => {
      const message = err.response.data.message;
      if (typeof err.response.data.message === "string") {
        ui.setSnackbar(true, "", message[0], "error");
      } else {
        ui.setSnackbar(true, "", message, "error");
      }
    });
}
</script>

<template>
  <Feedback
    v-if="ui.dataChangeComponent.includes('feedbackForgotPassword')"
    :title="'Verifique o seu e-mail'"
    :message="'Enviamos para o seu e-mail o link para redefinição da senha.'"
    :path="feedbackemail"
    :go-back="true"
    class="component-feedback"
  >
    <template #goback>
      <Button class="-flat" @click.prevent="$router.push({ path: '/signin' })">
        <span
          class="iconify mr-2"
          data-icon="dashicons:arrow-left-alt2"
          data-width="24"
          data-height="24"
        ></span>
        Ir para login
      </Button>
    </template>

    <template #linkfooter>
      <div class="info-resend-forgotpassword">
        <span>Ainda não recebeu?</span>
        <Button class="-link" @click.prevent="reSendForgotPassword">
          Reenviar e-mail
        </Button>
      </div>
    </template>
  </Feedback>
  <Forgotpassword
    v-else
    class="component-forgotpassword"
    @email="emailResend"
  ></Forgotpassword>
</template>
<style lang="scss">
.component-forgotpassword {
  @apply pt-24;
}
.component-feedback {
  @apply pt-24;
}

.info-resend-forgotpassword {
  @apply flex justify-center items-center  text-1xl;
  > span {
    @apply text-sm;
  }
}
</style>
