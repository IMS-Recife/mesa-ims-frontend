<script setup lang="ts">
import { useRoute } from "vue-router";
import { resetPassword } from "@services/auth";
import { useUIStore } from "@/stores/ui";

type Payload = {
  password: string;
  passwordConfirmation: string;
  resetToken: any;
  email: any;
};
const flagEyePassword1 = ref(false);
const flagEyePassword2 = ref(false);
const dynamicIconPassword1 = ref<any>("ant-design:eye-invisible-filled");
const dynamicIconPassword2 = ref<any>("ant-design:eye-invisible-filled");
const route = useRoute();
const ui = useUIStore();
const payload = reactive<Payload>({
  password: "",
  email: "",
  passwordConfirmation: "",
  resetToken: "",
});

function sendForApiResetPassword() {
  payload.password = formForSend.password;
  payload.passwordConfirmation = formForSend.passwordConfirm;
  payload.email = route.query.email;
  payload.resetToken = route.query.token;
  if (payload.email) {
    resetPassword(payload)
      .then((data) => {
        if (data.status === 201) {
          ui.changeComponent("feedbackRecoveryPassword");
        }
      })
      .catch((err) => {
        const message = err.response.data.message;

        if (typeof err.response.data.message === "string") {
          ui.setSnackbar(true, "", message, "error");
        } else {
          ui.setSnackbar(true, "", message[0], "error");
        }
      });
  }
}

function changePasswordType(index: number, param: any) {
  if (index === 0) {
    flagEyePassword1.value = !param.flagEyePassword1;
    if (flagEyePassword1.value) {
      dynamicIconPassword1.value = "ant-design:eye-filled";
    } else {
      dynamicIconPassword1.value = "ant-design:eye-invisible-filled";
    }
  }
  if (index === 1) {
    flagEyePassword2.value = !param.flagEyePassword2;
    if (flagEyePassword2.value) {
      dynamicIconPassword2.value = "ant-design:eye-filled";
    } else {
      dynamicIconPassword2.value = "ant-design:eye-invisible-filled";
    }
  }
}

const messageError = ref("");
const formForSend = reactive({
  password: "",
  passwordConfirm: "",
});

watch(
  () => formForSend.passwordConfirm,
  (value: any) => {
    if (value !== formForSend.password) {
      messageError.value = "Senha não confere";
    }

    if (value.length === 0) {
      messageError.value = "Preencha o campo confirmar senha";
    }

    if (value === formForSend.password) {
      messageError.value = "";
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <form
    class="form-recovery-password"
    @submit.prevent="sendForApiResetPassword"
  >
    <fieldset>
      <legend>
        <h1>IMS</h1>
        <h3>Recuperar Senha</h3>
        <p>
          Por favor digite o seu email para receber o link para recadastrar a
          senha.
        </p>
      </legend>
      <Textfield
        id="password"
        :key="dynamicIconPassword1"
        label="Senha"
        name="password"
        :value-model="formForSend.password"
        @update:value="formForSend.password = $event"
        :index="0"
        :param="{
          flagEyePassword1,
        }"
        :type="flagEyePassword1 ? 'text' : 'password'"
        :icon="dynamicIconPassword1"
        :action-icon="changePasswordType"
        required="required"
      >
        <template #password-strong>
          <PasswordStrong :password="formForSend.password"></PasswordStrong>
        </template>
      </Textfield>
      <Textfield
        id="password"
        :key="dynamicIconPassword2"
        label="Confirmar senha"
        name="password"
        :value-model="formForSend.passwordConfirm"
        @update:value="formForSend.passwordConfirm = $event"
        :type="flagEyePassword2 ? 'text' : 'password'"
        :icon="dynamicIconPassword2"
        :index="1"
        :param="{
          flagEyePassword2,
        }"
        :action-icon="changePasswordType"
        :error="messageError"
        required="required"
      >
      </Textfield>

      <Button type="submit" class="-primary -block">Enviar</Button>
    </fieldset>
  </form>
</template>
<style lang="scss">
.form-recovery-password {
  @apply flex flex-col justify-center items-center max-w-[548px];
  > fieldset {
    @apply max-w-[288px];
  }
  > fieldset > legend {
    @apply mb-8;
  }
  > fieldset > legend > h1 {
    @apply text-4xl text-brand-primary-dark font-bold mb-2 text-center mb-6 font-display;
  }
  > fieldset > legend > h3 {
    @apply text-2xl text-brand-primary-dark mb-2;
  }
}
</style>
