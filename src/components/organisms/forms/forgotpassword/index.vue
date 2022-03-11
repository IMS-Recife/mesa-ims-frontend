<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
// import { useAuthStore } from "@/stores/auth";
import { forgotPassword } from "@services/auth";

// const router = useRouter();
// const auth = useAuthStore();
const ui = useUIStore();
const messageError = ref("");

// auth.clearStore();

const formForSend = reactive({
  email: "",
});

const emit = defineEmits<{
  (e: "email", event: string): void;
}>();

function sendForgotPassword() {
  forgotPassword(formForSend.email)
    .then((data): any => {
      if (data.status === 200) {
        emit("email", formForSend.email);
        ui.changeComponent("feedbackForgotPassword");
      }
    })
    .catch((err: any) => {
      const message = err.response.data.message;

      if (typeof err.response.data.message === "string") {
        ui.setSnackbar(true, "", message, "error");
        messageError.value = message;
      } else {
        ui.setSnackbar(true, "", message[0], "error");
        messageError.value = message[0];
      }
    });
}
</script>

<template>
  <form class="form-forgotpassword" @submit.prevent="sendForgotPassword">
    <div class="route-component-top">
      <Button class="-flat" @click.prevent="$router.push({ path: '/signin' })">
        <span
          class="iconify mr-2"
          data-icon="dashicons:arrow-left-alt2"
          data-width="24"
          data-height="24"
        ></span>
        Voltar para login
      </Button>
    </div>
    <fieldset>
      <legend>
        <h3>Esqueceu a senha?</h3>
        <p>
          Por favor digite o seu email para receber o link para recadastrar a
          senha.
        </p>
      </legend>
      <Textfield
        id="email"
        label="E-mail"
        name="email"
        type="email"
        @update:value="formForSend.email = $event"
        :value-model="formForSend.email"
        required="required"
        :error="messageError"
      >
      </Textfield>

      <Button type="submit" class="-primary -block">Enviar</Button>
    </fieldset>
  </form>
</template>
<style lang="scss" scoped>
.route-component-top {
  position: absolute;
  left: 0;
  top: 40px;
}
.form-forgotpassword {
  @apply flex flex-col justify-center items-center;
  max-width: 548px;
  > fieldset {
    @apply max-w-[288px];
  }
  > fieldset > legend > h1 {
    @apply text-3xl text-brand-primary-dark font-weight-700 flex flex-col items-center my-2;
  }
  > fieldset > legend > h3 {
    @apply text-2xl text-brand-primary-dark mb-2;
  }
}
</style>
