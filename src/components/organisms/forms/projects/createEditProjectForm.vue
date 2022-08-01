<script setup lang="ts">
import { apiPostProject, apiEditProject, apiGetProjectById } from "@/services/projects";
import { useUIStore } from "@/stores/ui";

const ui = useUIStore();

interface Props {
  projectId?: string;
}
const props = defineProps<Props>();

const contentIsLoading = ref(false);

const fileName = ref("");

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
  plans: "",
  ods: "",
  relations: [
    {
      plans: "",
      ods: "",
    },
  ],
});

const currentStateOptions = [
  {
    value: "A iniciar",
    label: "A iniciar",
  },
  {
    value: "Em andamento",
    label: "Em andamento",
  },
  {
    value: "Concluído",
    label: "Concluído",
  },
];

const phaseOptions = [
  {
    value: "Estudo preliminar",
    label: "Estudo preliminar",
  },
  {
    value: "Anteprojeto",
    label: "Anteprojeto",
  },
  {
    value: "Projeto básico/legal",
    label: "Projeto básico/legal",
  },
  {
    value: "Projeto executivo",
    label: "Projeto executivo",
  },
  {
    value: "Obra",
    label: "Obra",
  },
  {
    value: "Entregue",
    label: "Entregue",
  },
];

const plansOptions = [
  {
    value: "PAS",
    label: "PAS",
  },
  {
    value: "EVTEA",
    label: "EVTEA",
  },
  {
    value: "Plano Diretor",
    label: "Plano Diretor",
  },
  {
    value: "Recife 500 anos",
    label: "Recife 500 anos",
  },
  {
    value: "Plano Local de Ação Climática",
    label: "Plano Local de Ação Climática",
  },
  {
    value: "Plano de Saneamento",
    label: "Plano de Saneamento",
  },
  {
    value:
      "Projeto de Reestruturação Urbana e Dinamização Econômica de Centralidades do Recife (Projeto Centralidades)",
    label:
      "Projeto de Reestruturação Urbana e Dinamização Econômica de Centralidades do Recife (Projeto Centralidades)",
  },
  {
    value: "Plano Urbanístico de Recuperação Ambiental - PURA (Parque Capibaribe)",
    label: "Plano Urbanístico de Recuperação Ambiental - PURA (Parque Capibaribe)",
  },
  {
    value: "Plano de Manejo",
    label: "Plano de Manejo",
  },
  {
    value: "Plano Diretor de Drenagem Urbana",
    label: "Plano Diretor de Drenagem Urbana",
  },
  {
    value: "Plano de Mobilidade",
    label: "Plano de Mobilidade",
  },
  {
    value: "Plano Municipal de Habitação de Interesse Social",
    label: "Plano Municipal de Habitação de Interesse Social",
  },
  {
    value: "Plano Local de Habitação de Interesse Social",
    label: "Plano Local de Habitação de Interesse Social",
  },
  {
    value: "Plano de Adaptação Setorial do Recife",
    label: "Plano de Adaptação Setorial do Recife",
  },
];

const odsOptions = [
  {
    value: "Erradicação da Pobreza",
    label: "Erradicação da Pobreza",
  },
  {
    value: "Fome zero e agricultura sustentável",
    label: "Fome zero e agricultura sustentável",
  },
  {
    value: "Saúde e bem-estar",
    label: "Saúde e bem-estar",
  },
  {
    value: "Educação de qualidade",
    label: "Educação de qualidade",
  },
  {
    value: "Igualdade de gênero",
    label: "Igualdade de gênero",
  },
  {
    value: "Água potável e saneamento",
    label: "Água potável e saneamento",
  },
  {
    value: "Energia limpa e acessível",
    label: "Energia limpa e acessível",
  },
  {
    value: "Trabalho decente e crescimento econômico",
    label: "Trabalho decente e crescimento econômico",
  },
  {
    value: "Indústria, inovação e infraestrutura",
    label: "Indústria, inovação e infraestrutura",
  },
  {
    value: "Redução das desigualdades",
    label: "Redução das desigualdades",
  },
  {
    value: "Cidades e comunidades sustentáveis",
    label: "Cidades e comunidades sustentáveis",
  },
  {
    value: "Consumo e produção responsáveis",
    label: "Consumo e produção responsáveis",
  },
  {
    value: "Ação contra a mudança global do clima",
    label: "Ação contra a mudança global do clima",
  },
  {
    value: "Vida na água",
    label: "Vida na água",
  },
  {
    value: "Vida terrestre",
    label: "Vida terrestre",
  },
  {
    value: "Paz, justiça e instituições eficazes",
    label: "Paz, justiça e instituições eficazes",
  },
  {
    value: "Parcerias e meios de implementação",
    label: "Parcerias e meios de implementação",
  },
];

function readUploadFile(event: any) {
  let files = event.target.files;
  if (!files[0]) return;
  console.log(event.target.files);
  fileName.value = files[0].name;
  let leitor = new FileReader();
  leitor.onload = (e) => {
    let contents = e.target!.result;
    formForSend.areas = JSON.parse(contents as string);
    console.log(formForSend.areas);
  };
  leitor.readAsText(files[0]);
}

// fileInput!.addEventListener("change", function (event) {
//   var file = fileInput.files[0],
//     fr = new FileReader();
//   fileInput.value = ""; // Clear the input.
//   extention = file.name.split(".")[1];
//   if (extention === "geojson") {
//     fr.onload = function () {
//       console.log(fr.result);
//     };
//     fr.readAsDataURL(file);
//   }
// });

watch(formForSend, (value) => {
  console.log(value);
});

onBeforeMount(() => {
  if (props.projectId) {
    contentIsLoading.value = true;
    apiGetProjectById(props.projectId)
      .then((response) => {
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
      })
      .then(() => {
        contentIsLoading.value = false;
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
      if (response.status === 201 || response.status === 200) {
        ui.setSnackbar(true, "", "Projeto criado com sucesso!", "success");
        window.location.reload();
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

const editProject = (projectID: string): void => {
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

  apiEditProject(projectID, project)
    .then((response) => {
      if (response.status === 200) {
        ui.setSnackbar(true, "", "Projeto editado com sucesso!", "success");
        window.location.reload();
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

const submitForm = (): void => {
  if (props.projectId !== undefined && props.projectId !== "") {
    console.log("Project ID:", props.projectId);
    editProject(props.projectId);

    return;
  }

  registerProject();
};
</script>

<template>
  <form id="create-project" @submit.prevent="submitForm">
    <TitleH4 class="form-title">Novo projeto</TitleH4>
    <div class="project-field-section" v-if="!contentIsLoading">
      <Overline class="section-title">SOBRE</Overline>
      <fieldset>
        <Textfield
          label="Nome"
          placeholder="Nome do projeto"
          minWidth="250px"
          @update:value="formForSend.name = $event"
          :valueModel="formForSend.name"
        />
        <Textfield
          label="Orgão responsável"
          placeholder="Orgão responsável"
          minWidth="250px"
          @update:value="formForSend.responsibleOrg = $event"
          :valueModel="formForSend.responsibleOrg"
        />
        <Textfield
          label="Link de referência"
          placeholder="Link de referência"
          minWidth="250px"
          @update:value="formForSend.referenceLink = $event"
          :valueModel="formForSend.referenceLink"
        />
        <DatePickerField
          label="Data de início"
          minWidth="250px"
          @update:value="formForSend.startDate = $event"
          :valueModel="formForSend.startDate"
        />
        <SelectField
          label="Fase"
          :options="phaseOptions"
          @update:value="formForSend.phase = $event"
          placeholder="Fase"
        />
        <SelectField
          label="Situação"
          :options="currentStateOptions"
          @update:value="formForSend.currentState = $event"
          placeholder="Situação"
        />
        <Textfield
          label="Unidade de medida"
          placeholder="Exemplo: metro linear"
          minWidth="250px"
          @update:value="formForSend.measurementUnit = $event"
          :valueModel="formForSend.measurementUnit"
        />
        <Textfield
          label="Quantidade prevista*"
          placeholder="Exemplo: 2000"
          minWidth="250px"
          type="number"
          @update:value="formForSend.expectedQuantity = Number($event)"
          :valueModel="formForSend.expectedQuantity"
        />
        <Textfield
          label="Quantidade executada"
          placeholder="Quantidade executada"
          minWidth="250px"
          type="number"
          @update:value="formForSend.executedQuantity = Number($event)"
          :valueModel="formForSend.executedQuantity"
        />
        <Textfield
          label="Valor do projeto"
          placeholder="Valor do projeto"
          minWidth="250px"
          type="number"
          @update:value="formForSend.projectValue = Number($event)"
          :valueModel="formForSend.projectValue"
        />
        <Textfield
          label="Valor da obra"
          placeholder="Valor da obra"
          minWidth="250px"
          type="number"
          @update:value="formForSend.constructionWorkValue = Number($event)"
          :valueModel="formForSend.constructionWorkValue"
        />
        <Textfield
          label="Tamanho das infiltrações"
          placeholder="Tamanho das infiltrações"
          minWidth="250px"
          type="number"
          @update:value="formForSend.infiltrationsSize = Number($event)"
          :valueModel="formForSend.infiltrationsSize"
        />
        <Textfield
          label="Porcentagem concluída"
          placeholder="Porcentagem concluída"
          minWidth="250px"
          type="number"
          maxNumber="100"
          minNumber="1"
          @update:value="formForSend.completedPercentage = Number($event)"
          :valueModel="formForSend.completedPercentage"
        />
      </fieldset>
    </div>

    <div class="project-field-section" v-if="!contentIsLoading">
      <Overline class="section-title">RELAÇÕES</Overline>
      <fieldset>
        <SelectField
          label="ODS*"
          :options="odsOptions"
          @update:value="formForSend.relations[0].ods = $event"
          placeholder="Objt. Desen. Sust."
        />
        <SelectField
          label="Planos"
          :options="plansOptions"
          @update:value="formForSend.relations[0].plans = $event"
          placeholder="Planos"
        />
        <Textfield
          label="Grupos temáticos"
          placeholder="Grupos temáticos"
          minWidth="350px"
          @update:value="formForSend.thematicGroups = $event"
          :valueModel="formForSend.thematicGroups"
        />
      </fieldset>
    </div>

    <div class="partners-field-section" v-if="!contentIsLoading">
      <Overline class="section-title">PARCEIROS</Overline>
      <fieldset class="partners-fields">
        <Textfield
          label="Parceiros"
          placeholder="Parceiros"
          minWidth="350px"
          @update:value="formForSend.partners = $event"
          :valueModel="formForSend.partners"
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

    <div class="project-field-section" v-if="!contentIsLoading">
      <Overline class="section-title">GEOMETRIA E LOCALIZAÇÃO</Overline>
      <fieldset class="partners-fields">
        <Button class="-tertiary">Marcar no mapa</Button>
        <Button class="-tertiary">Selecionar lote existente</Button>
        <Label for="geojson" class="upload-geojson-button">Adicionar GEOJSON</Label>
        <span>{{ fileName }}</span>
        <input
          type="file"
          accept=".geojson, .json"
          name="geojson"
          id="geojson"
          @change="readUploadFile"
        />
      </fieldset>
    </div>
    <Button class="-primary mt-20 ml-auto" type="submit" v-if="!contentIsLoading"
      >ENVIAR</Button
    >
  </form>
</template>

<style lang="scss" scoped>
#geojson {
  @apply hidden;
}

.upload-geojson-button {
  @apply flex items-center justify-center h-12 px-4 py-4;
  @apply bg-brand-primary-medium text-neutrals-lightgrey-lightest text-[12px] hover: brightness-110 hover:filter uppercase;
  min-width: 100px;
  min-height: 40px;
  max-height: 40px;
  border-radius: 12px;
}

form {
  @apply min-h-100;

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
