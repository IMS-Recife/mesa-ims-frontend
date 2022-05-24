<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import { registerUser } from "@services/register";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const ui = useUIStore();

const route = useRoute();
const steppers = reactive([
  {
    label: "Selecionar Perfil",
    // path: "/signup",
    stepper: 1,
  },
  {
    label: "Dados adicionais",
    // path: "/signin",
    stepper: 2,
  },
]);

const checkBoxFlag = ref(false);

const passwords = reactive({
  password: "",
  confirmPassword: "",
});

const formForSend = reactive({
  name: "",
  email: "",
  password: "",
  roles: [""],
});

const flagEyePassword1 = ref(false);
const flagEyePassword2 = ref(false);
const dynamicIconPassword1 = ref<any>("ant-design:eye-invisible-filled");
const dynamicIconPassword2 = ref<any>("ant-design:eye-invisible-filled");

const messageError = ref("");

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

formForSend.roles[0] = route.params.role as string;

const checkbox = (value: any) => {
  checkBoxFlag.value = value;
  return value;
};

function createUser() {
  registerUser(formForSend)
    .then((response) => {
      if (response.status === 201) {
        ui.changeComponent("feedbackCreateUser");

        auth.setData(response.data);
      }
    })
    .catch((err: any) => {
      const message = err.response.data.message;

      if (typeof err.response.data.message === "string") {
        ui.setSnackbar(true, "", message, "error");
      } else {
        ui.setSnackbar(true, "", message[0], "error");
      }
    });
}

watch(
  () => passwords.confirmPassword,
  (value: any) => {
    if (value !== formForSend.password) {
      messageError.value = "Senha não confere";
    }

    if (value.length === 0) {
      messageError.value = "Preencha o campo confirmar senha";
    }

    if (value === passwords.password) {
      messageError.value = "";
      formForSend.password = passwords.confirmPassword;
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <ModalTermPolitc modal-name="modal-term-politc" title="Termos e Políticas IMS">
    <template #content>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
      praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
      officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
      rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
      eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere
      possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
      quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
      voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
      tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
      consequatur aut perferendis doloribus asperiores repellat. At vero eos et accusamus
      et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
      atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate
      non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
      laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
      minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
      dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
      necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non
      recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
      voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
      repellat."
    </template>

    <template #footer>
      <Button
        class="-outlined -block"
        @click.prevent="checkbox(false), ui.toggleModal('modal-term-politc')"
        >Recusar
      </Button>
      <Button
        class="-primary -block"
        @click.prevent="checkbox(true), ui.toggleModal('modal-term-politc')"
      >
        Continuar
      </Button>
    </template>
  </ModalTermPolitc>
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
  <form class="form-register" @submit.prevent="createUser">
    <legend>
      <Title class="title" title="Cadastre-se" />
      <!-- <Steppers class="steppers" :current="2" :options="steppers" /> -->
      <Info class="info" info="Preencha os dados abaixo para finalizar o cadastro" />
    </legend>
    <fieldset>
      <Textfield
        id="name"
        label="Nome"
        name="Nome"
        type="text"
        @update:value="formForSend.name = $event"
        :value-model="formForSend.name"
        required="required"
      ></Textfield>
      <Textfield
        id="email"
        label="E-mail"
        name="email"
        type="email"
        @update:value="formForSend.email = $event"
        :value-model="formForSend.email"
        required="required"
      ></Textfield>
      <Textfield
        id="password"
        :key="dynamicIconPassword1"
        label="Senha"
        name="password"
        :value-model="passwords.password"
        @update:value="passwords.password = $event"
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
          <PasswordStrong :password="passwords.password"></PasswordStrong>
        </template>
      </Textfield>
      <Textfield
        id="password"
        :key="dynamicIconPassword2"
        label="Confirmar senha"
        name="password"
        :value-model="passwords.confirmPassword"
        @update:value="passwords.confirmPassword = $event"
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

      <Checkbox
        class="checkbox-terms"
        @update:value="checkbox($event)"
        :valueModel="checkBoxFlag"
        :required="true"
      >
        <p class="terms">
          Li e aceito os
          <a href="#" @click.prevent="ui.toggleModal('modal-term-politc')"
            >Termos e políticas</a
          >
          do IMS
        </p>
      </Checkbox>

      <Button class="-primary -block" type="submit">Continuar </Button>
    </fieldset>
  </form>
</template>

<style lang="scss" scoped>
.route-component-top {
  position: absolute;
  left: 0;
  top: 20px;

  @screen <smdt {
    position: absolute;
    left: 0;
    top: 4px;
  }
}

.form-register {
  @apply flex-col justify-center items-center top-15 relative overflow-hidden;

  @screen <smdt {
    @apply top-9;
  }

  > legend {
    > .title {
      @apply py-2;

      @screen <smdt {
        @apply py-0;
      }
    }

    > .steppers {
      @apply pb-6;

      @screen <smdt {
        @apply pb-4;
      }
    }

    > .info {
      @apply mb-3;

      @screen <smdt {
        @apply mb-2;
      }
    }
  }

  > fieldset {
    > .checkbox-terms {
      @apply mb-4;

      @screen <smdt {
        @apply my-4;
      }

      > .terms {
        @apply text-[12px] font-sans ml-4;

        > a {
          @apply underline;
        }
      }
    }
  }
}
</style>
