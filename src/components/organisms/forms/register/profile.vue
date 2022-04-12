<script setup lang="ts">
import { useAuthStore } from "@stores/auth";
import { registerUserGoogle, registerUserFacebook } from "@services/register";
import { useUIStore } from "@/stores/ui";

const router = useRouter();
const auth = useAuthStore();
const ui = useUIStore();

const labelButton = ref("Continuar");

const roles = reactive([
  {
    label: "Cidadão",
    value: "CITIZEN",
    flag: true,
  },
  {
    label: "Investidor",
    value: "INVESTOR",
    flag: false,
  },
]);

const payloadRegisterRole = reactive({
  role: "CITIZEN",
});

const steppers = ref([
  {
    label: "Selecionar Perfil",
    path: "/signup",
    stepper: 1,
  },
  {
    label: "Dados adicionais",
    path: "/signin",
    stepper: 2,
  },
]);

function checked(position: number) {
  roles.forEach((item, index) => {
    if (index === position) {
      item.flag = true;
    } else {
      item.flag = false;
    }
  });

  payloadRegisterRole.role = roles[position].value;
}

if (auth.credentialGoogleToken) {
  labelButton.value = "Cadastrar com Google";
  steppers.value.length = 1;
}

if (auth.credentialFacebookToken) {
  labelButton.value = "Cadastrar com Facebook";
  steppers.value.length = 1;
}

function sendForFinish() {
  if (auth.credentialGoogleToken) {
    registerUserGoogle({
      credential: auth.credentialGoogleToken,
      roles: [payloadRegisterRole.role],
    })
      .then((response) => {
        if (response.status === 201) {
          ui.changeComponent("feedbackCreateUser");

          auth.setDataSocialGoogle(response.data.token.accessToken);

          router.push({
            name: "role",
            params: {
              role: payloadRegisterRole.role,
            },
          });
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

  if (auth.credentialFacebookToken) {
    registerUserFacebook({
      credential: auth.credentialFacebookToken,
      roles: [payloadRegisterRole.role],
    })
      .then((response) => {
        if (response.status === 201) {
          ui.changeComponent("feedbackCreateUser");

          auth.setDataSocialFacebook(response.data.token.accessToken);
          router.push({
            name: "role",
            params: {
              role: payloadRegisterRole.role,
            },
          });
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
  } else {
    router.push({
      name: "role",
      params: {
        role: payloadRegisterRole.role,
      },
    });
  }
}
</script>

<template>
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
  <div class="form-register">
    <fieldset>
      <Title class="title" title="Cadastre-se" />
      <Steppers class="steppers" :current="1" :options="steppers" />
      <Info
        class="info"
        info="Escolha abaixo o perfil que melhor você se encaixa"
      />
      <CardTicket
        class="card-ticket"
        :actived="roles[0].flag"
        title="Cidadão"
        text="Sei mais sobre a minha cidade e os projeto do meu bairro."
        icon-type="bi:person-circle"
        icon-status="charm:tick"
        @click="checked(0)"
      />

      <CardTicket
        class="card-ticket"
        :actived="roles[1].flag"
        title="Investidor"
        text="Sei mais sobre a minha cidade e os projeto do meu bairro."
        icon-type="ph:target"
        icon-status="charm:tick"
        @click="checked(1)"
      />

      <Button class="-primary -block" @click="sendForFinish"
        >{{ labelButton }}
      </Button>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>
.route-component-top {
  position: absolute;
  left: 0;
  top: 40px;
}
.form-register {
  @apply flex-col justify-center items-center  relative top-20;
  > fieldset {
    > .title {
      @apply py-6;
      @screen <smdt {
        @apply py-2;
      }
    }
    > .steppers {
      @apply pb-8;
      @screen <smdt {
        @apply pb-4;
      }
    }
    > .card-ticket {
      @apply mb-8;
      @screen <smdt {
        @apply mb-6;
      }
    }
    > .info {
      @apply mb-8;
      @screen <smdt {
        @apply mb-4;
      }
    }
  }
}
</style>
