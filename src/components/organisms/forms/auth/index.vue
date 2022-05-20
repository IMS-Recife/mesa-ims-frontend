<script setup lang="ts">
import { signin, googleSignin, facebookSignin } from "@services/auth";
import { useUIStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";

import google from "@/assets/icons/google-1.svg";
import facebook from "@/assets/icons/facebook-1.svg";
import conectarecife from "@/assets/icons/logo-conecta-recife-1.svg";

const router = useRouter();
const auth = useAuthStore();
const ui = useUIStore();

const gapi = ref<any>(null);
const FB = ref<any>(null);

function fetchSigninSocial(social: string) {
  auth.setKeepOnline(true);
  if (social === "facebook") {
    FB.value.getLoginStatus((response: any) => {
      if (response.status === "connected") {
        const token = response.authResponse.accessToken;
        facebookSignin({ credential: token })
          .then((response: any) => {
            if (response.status === 200) {
              auth.setDataSocialFacebook(response.data.token.accessToken);

              ui.setResetUI(true);

              router.push("/home");
            }
          })
          .catch((err: any) => {
            if (err.response.status === 412) {
              auth.setCredentialFacebookToken(token);
              router.push("/signup");
            }
            const message =
              err.response.data.message === "Invalid credentials"
                ? "Credenciais inválidas"
                : err.response.data.message;

            if (typeof err.response.data.message === "string") {
              ui.setSnackbar(true, "", message, "error");
            } else {
              ui.setSnackbar(true, "", message[0], "error");
            }
          });
      } else {
        FB.value.login(
          (response: any) => {
            const token = response.authResponse.accessToken;
            facebookSignin({ credential: token })
              .then((response: any) => {
                if (response.status === 200) {
                  auth.setDataSocialFacebook(response.data.token.accessToken);
                  ui.setResetUI(true);
                  router.push("/home");
                }
              })
              .catch((err: any) => {
                if (err.response.status === 412) {
                  auth.setCredentialFacebookToken(token);
                  router.push("/signup");
                }
                const message =
                  err.response.data.message === "Invalid credentials"
                    ? "Credenciais inválidas"
                    : err.response.data.message;

                if (typeof err.response.data.message === "string") {
                  ui.setSnackbar(true, "", message, "error");
                } else {
                  ui.setSnackbar(true, "", message[0], "error");
                }
              });
          },
          { scope: "public_profile,email" }
        );
      }
    });
  }
  if (social === "google") {
    gapi.value.auth2
      .getAuthInstance()
      .signIn()
      .then(() => storeTokenGoogle());
  }
}
function storeTokenGoogle() {
  const token = gapi.value.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse().id_token;

  googleSignin({ credential: token })
    .then((response: any) => {
      if (response.status === 200) {
        auth.setDataSocialGoogle(response.data.token.accessToken);
        ui.setResetUI(true);
        router.push("/home");
      }
    })
    .catch((err: any) => {
      console.log(err, "err");
      if (err.response.status === 412) {
        auth.setCredentialGoogleToken(token);
        router.push("/signup");
      }
      const message =
        err.response.data.message === "Invalid credentials"
          ? "Credenciais inválidas"
          : err.response.data.message;

      if (typeof err.response.data.message === "string") {
        ui.setSnackbar(true, "", message, "error");
      } else {
        ui.setSnackbar(true, "", message[0], "error");
      }
    });
}

onBeforeMount(() => {
  FB.value = window.FB;
  gapi.value = window.gapi;

  if (auth.token.accessToken) {
    ui.setResetUI(true);
    router.push("/home");
  }
});

const flagEyePassword = ref(false);
const dynamicIconPassword = ref<any>("ant-design:eye-invisible-filled");
const linksForButtonsIcons = reactive([
  {
    path: google,
    alt: "Show password",
    width: "24",
    height: "24",
    name: "google",
  },
  {
    path: facebook,
    alt: "Hide password",
    width: "24",
    height: "24",
    name: "facebook",
  },
  {
    path: conectarecife,
    alt: "Hide password",
    width: "24",
    height: "24",
    name: "conectarecife",
  },
]);

const formForSend = reactive({
  email: "",
  password: "",
});
const checkbox = (value: any) => {
  auth.setKeepOnline(value);
  return value;
};
function changePasswordType() {
  flagEyePassword.value = !flagEyePassword.value;
  if (flagEyePassword.value) {
    dynamicIconPassword.value = "ant-design:eye-filled";
  } else {
    dynamicIconPassword.value = "ant-design:eye-invisible-filled";
  }
}
const messageError = ref("");
function fetchSignin(form: any) {
  signin({ email: formForSend.email, password: formForSend.password })
    .then(({ data }: any) => {
      auth.setData(data);
      ui.setResetUI(true);
      router.push({
        name: "home",
      });
      if (!auth.keepOnline && auth.token.accessToken) {
        const SetIntervalExpToken = setInterval(() => {
          auth.verifyExp(auth.token.exp, SetIntervalExpToken);
        }, 5000);
      }
    })
    .catch((err: any) => {
      const message =
        err.response.data.message === "Unauthorized"
          ? "Credenciais inválidas"
          : err.response.data.message;

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
  <form class="form-signin" @submit.prevent="fetchSignin">
    <fieldset>
      <legend>
        <h1>IMS</h1>
        <h3>Bem vinda(o) de volta!</h3>
        <p>
          Faça o login e tenha acesso à dados exclusivos da cidade para você!
        </p>
        <div class="others-signin">
          <ButtonIcon :key="index" :path="item.path" v-for="(item, index) in linksForButtonsIcons"
            @click.prevent="fetchSigninSocial(item.name)"></ButtonIcon>
        </div>
        <div class="or">
          <span class="bar"></span>
          <span class="text">ou</span>
          <span class="bar"></span>
        </div>
      </legend>
      <Textfield id="email" label="E-mail" name="email" type="email" @update:value="formForSend.email = $event"
        :value-model="formForSend.email" :required="true"></Textfield>
      <Textfield id="password" :key="dynamicIconPassword" label="Senha" name="password"
        :value-model="formForSend.password" @update:value="formForSend.password = $event"
        :type="flagEyePassword ? 'text' : 'password'" :icon="dynamicIconPassword" :action-icon="changePasswordType"
        :error="messageError" :required="true">
      </Textfield>

      <div class="suport-auth">
        <Checkbox label="Manter conectado" @update:value="checkbox($event)"></Checkbox>
        <Button class="-link" @click.prevent="$router.push({ path: '/forgot-password' })">
          Esqueceu a senha?</Button>
      </div>

      <Button type="submit" class="-primary -block">Entrar</Button>

      <div class="signup-acess-guest">
        <Button class="-link">Entrar como visitante</Button>
        <div class="signup-acess">
          <p>Não tem uma conta?</p>
          <span><Button class="-link" @click.prevent="$router.push({ path: '/signup' })">
              Cadastre-se</Button></span>
        </div>
      </div>
    </fieldset>
  </form>
</template>
<style lang="scss">
.form-signin {
  @apply flex flex-col justify-center items-center;
  max-width: 548px;

  >fieldset {
    @apply max-w-[288px];
  }

  >fieldset>legend>h1 {
    @apply text-3xl text-brand-primary-dark font-weight-700 flex flex-col items-center my-2 font-display;
  }

  >fieldset>legend>h3 {
    @apply text-2xl text-brand-primary-dark font-weight-600 mb-2;
  }

  >fieldset>legend>.others-signin {
    @apply my-4 flex flex-row items-center justify-center gap-x-5.21;
  }

  >fieldset>legend>.or {
    @apply mt-2 flex flex-row items-center justify-center;

    >.text {
      @apply mx-4;
    }

    >.bar {
      @apply w-[116px] h-[1px];
      background-color: #d9d9d9;
    }
  }

  >fieldset>.suport-auth {
    @apply flex flex-row items-center justify-between mb-4;
  }

  >fieldset>.signup-acess-guest {
    @apply flex flex-col items-center justify-between my-4;

    @screen <smdt {
      @apply my-0;
    }

    >.signup-acess {
      @apply flex flex-row items-center justify-center w-full;

      >p {
        @apply text-sm;
        position: relative;
        left: 10px;
      }

      >span {
        @apply text-sm text-brand-primary-dark font-weight-600;
      }
    }
  }
}
</style>
