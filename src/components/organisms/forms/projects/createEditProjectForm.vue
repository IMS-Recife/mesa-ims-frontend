<script setup lang="ts">
import { apiPostProject } from "@/services/projects";
import { useUIStore } from "@/stores/ui";
import { apiGetProjectById } from "@/services/projects";

const ui = useUIStore();

interface Props {
  projectId?: string;
}
const props = defineProps<Props>();

const formForSend = reactive({
  name: "",
  responsibleOrg: "",
  currentState: "",
  areas: [],
  startDate: "",
  location: "",
  thematicGroups: "",
  referenceLink: "",
  phase: "",
  measurementUnit: "",
  expectedQuantity: 1,
  executedQuantity: 1,
  projectValue: 1,
  infiltrationsSize: 1,
  constructionWorkValue: 1,
  partners: "",
  completedPercentage: 1,
  relations: [],
  plans: "",
});

watch(formForSend, (value) => {
  console.log(value);
});

onBeforeMount(() => {
  if (props.projectId) {
    apiGetProjectById(props.projectId).then((response) => {
      formForSend.name = response.data.name;
      formForSend.responsibleOrg = response.data.responsibleOrg;
      formForSend.currentState = response.data.currentState;
      formForSend.areas = response.data.areas;
      formForSend.startDate = response.data.startDate;
      formForSend.location = response.data.location;
      formForSend.thematicGroups = response.data.thematicGroups;
      formForSend.referenceLink = response.data.referenceLink;
      formForSend.phase = response.data.phase;
      formForSend.measurementUnit = response.data.measurementUnit;
      formForSend.expectedQuantity = response.data.expectedQuantity;
      formForSend.executedQuantity = response.data.executedQuantity;
      formForSend.projectValue = response.data.projectValue;
      formForSend.infiltrationsSize = response.data.infiltrationsSize;
      formForSend.constructionWorkValue = response.data.constructionWorkValue;
      formForSend.partners = response.data.partners;
      formForSend.completedPercentage = response.data.completedPercentage;
      formForSend.relations = response.data.relations;
      formForSend.plans = response.data.plans;
    });
  }
});

const registerProject = () => {
  const {
    name,
    responsibleOrg,
    currentState,
    areas,
    startDate,
    location,
    thematicGroups,
    referenceLink,
    phase,
    measurementUnit,
    expectedQuantity,
    executedQuantity,
    projectValue,
    infiltrationsSize,
    constructionWorkValue,
    partners,
    completedPercentage,
    relations,
  } = formForSend;

  const project = {
    name,
    responsibleOrg,
    currentState,
    areas,
    startDate,
    location,
    thematicGroups,
    referenceLink,
    phase,
    measurementUnit,
    expectedQuantity,
    executedQuantity,
    projectValue,
    infiltrationsSize,
    constructionWorkValue,
    partners,
    completedPercentage,
    relations,
  };

  apiPostProject(project)
    .then((response) => {
      if (response.status === 201) {
        ui.setSnackbar(true, "", "Projeto criado com sucesso!", "success");
        // window.location = window.location;
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
};
</script>

<template>
  <form id="create-project" @submit.prevent="registerProject">
    <TitleH4 class="form-title">Novo projeto</TitleH4>
    <div class="project-field-section">
      <Overline class="section-title">SOBRE</Overline>
      <fieldset>
        <Textfield
          label="Nome"
          placeholder="Nome do projeto"
          minWidth="250px"
          @update:value="formForSend.name = $event"
        />
        <Textfield
          label="Orgão responsável"
          placeholder="Orgão responsável"
          minWidth="250px"
          @update:value="formForSend.responsibleOrg = $event"
        />
        <Textfield
          label="Link de referência"
          placeholder="Link de referência"
          minWidth="250px"
          @update:value="formForSend.referenceLink = $event"
        />
        <DatePickerField
          label="Data de início"
          minWidth="250px"
          @update:value="formForSend.startDate = $event"
        />
        <Textfield
          label="Fase"
          placeholder="Fase"
          minWidth="250px"
          @update:value="formForSend.phase = $event"
        />
        <Textfield
          label="Situação"
          placeholder="Situação"
          minWidth="250px"
          @update:value="formForSend.currentState = $event"
        />
        <Textfield
          label="Unidade de medida"
          placeholder="Exemplo: metro linear"
          minWidth="250px"
          @update:value="formForSend.measurementUnit = $event"
        />
        <Textfield
          label="Quantidade prevista*"
          placeholder="Exemplo: 2000"
          minWidth="250px"
          type="number"
          @update:value="formForSend.expectedQuantity = Number($event)"
        />
        <Textfield
          label="Quantidade executada"
          placeholder="Quantidade executada"
          minWidth="250px"
          type="number"
          @update:value="formForSend.executedQuantity = Number($event)"
        />
        <Textfield
          label="Valor do projeto"
          placeholder="Valor do projeto"
          minWidth="250px"
          type="number"
          @update:value="formForSend.projectValue = Number($event)"
        />
        <Textfield
          label="Valor da obra"
          placeholder="Valor da obra"
          minWidth="250px"
          type="number"
          @update:value="formForSend.constructionWorkValue = Number($event)"
        />
        <Textfield
          label="Tamanho das infiltrações"
          placeholder="Tamanho das infiltrações"
          minWidth="250px"
          type="number"
          @update:value="formForSend.infiltrationsSize = Number($event)"
        />
        <Textfield
          label="Porcentagem concluída"
          placeholder="Porcentagem concluída"
          minWidth="250px"
          type="number"
          maxNumber="100"
          minNumber="1"
          @update:value="formForSend.completedPercentage = Number($event)"
        />
      </fieldset>
    </div>

    <div class="project-field-section">
      <Overline class="section-title">RELAÇÕES</Overline>
      <fieldset>
        <Textfield label="ODS*" placeholder="Objt. Desen. Sust." minWidth="350px" />
        <Textfield
          label="Planos"
          placeholder="Planos"
          minWidth="350px"
          @update:value="formForSend.plans = $event"
        />
        <Textfield
          label="Grupos temáticos"
          placeholder="Grupos temáticos"
          minWidth="350px"
          @update:value="formForSend.thematicGroups = $event"
        />
      </fieldset>
    </div>

    <div class="partners-field-section">
      <Overline class="section-title">PARCEIROS</Overline>
      <fieldset class="partners-fields">
        <Textfield
          label="Parceiros"
          placeholder="Parceiros"
          minWidth="350px"
          @update:value="formForSend.partners = $event"
        />
        <!-- <Textfield label="Responsável" placeholder="Responsável" minWidth="350px" />
        <Textfield
          label="Tipo do projeto"
          placeholder="Tipo do projeto"
          minWidth="350px"
        />
        <button class="plus-icon-button">
          <span
            class="iconify"
            data-icon="mdi-plus"
            data-height="24"
            data-width="24"
          ></span>
        </button> -->
      </fieldset>
    </div>

    <div class="project-field-section">
      <Overline class="section-title">GEOMETRIA E LOCALIZAÇÃO</Overline>
      <fieldset class="partners-fields">
        <Button class="-tertiary">Marcar no mapa</Button>
        <Button class="-primary">Selecionar lote existente</Button>
        <Button class="-tertiary" disabled>Adicionar shapefile</Button>
      </fieldset>
    </div>
    <Button class="-primary mt-20 ml-auto" type="submit">ENVIAR</Button>
  </form>
</template>

<style lang="scss" scoped>
form {
  > .form-title {
    @apply text-brand-primary-dark;
  }
}

.project-field-section {
  @apply flex flex-col;
}

.partners-field-section {
  @apply flex flex-col;
  @apply bg-neutrals-lightgrey-light p-4 rounded-xl;

  > .partners-fields {
    @apply flex items-center;

    > .plus-icon-button {
      @apply text-brand-primary-medium;
      @apply mt-5;
    }
  }
}

.section-title {
  @apply text-brand-secondary-medium my-2;
}

fieldset {
  @apply flex flex-wrap gap-4;
}
</style>
