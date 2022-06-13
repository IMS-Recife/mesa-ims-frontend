<route lang="yaml">
name: interventions
meta:
  layout: sidebar_layout
</route>

<script setup lang="ts">
import moment from "moment";
import { apiGetListProjects, apiDeleteProject } from "@/services/projects";
import TableLite from "vue3-table-lite/ts";
import { useUIStore } from "@/stores/ui";

const ui = useUIStore();

const nameSearch = ref("");
const locationSearch = ref("");
const responsibleOrgSearch = ref("");
const partnersSearch = ref("");
const thematicGroupsSearch = ref("");

const projects = ref<any[]>([]);

const isCreateProjectModalOpen = ref(false);
const isEditProjectModalOpen = ref(false);
const isDeleteProjectModalOpen = ref(false);
const projectId = ref("");

const isReady = ref(false);

onMounted(() => {
  isReady.value = true;

  apiGetListProjects().then((data) => {
    console.log("projectsData", data);
    projects.value = data.data;

    const formatedProjects = projects.value.map((project) => {
      return {
        ...project,
        lastUpdate: moment(project.lastUpdate).format("DD/MM/YYYY"),
        completedPercentage: project.completedPercentage
          ? `${project.completedPercentage} %`
          : "-",
      };
    });
    table.totalRecordCount = formatedProjects.length;
    table.rows = formatedProjects;
  });
});

const routes = [
  {
    path: "/home",
    icon: "mdi-home",
    name: "Início",
    currentPath: false,
  },
  {
    path: "/interventions",
    name: "Intervenções na cidade",
    currentPath: true,
  },
];

const table = reactive({
  isLoading: false,
  isReSearch: false,
  columns: [
    {
      label: "Projetos",
      field: "name",
      width: "10%",
      sortable: true,
    },
    {
      label: "Local",
      field: "location",
      width: "10%",
      sortable: true,
    },
    {
      label: "%",
      field: "completedPercentage",
      width: "1%",
      sortable: true,
    },
    {
      label: "Responsável",
      field: "responsibleOrg",
      width: "10%",
      sortable: true,
    },
    {
      label: "Parceiro(s)",
      field: "partners",
      width: "10%",
    },
    {
      label: "Grupo Temático",
      field: "thematicGroups",
      width: "10%",
    },
    {
      label: "Última Atualização",
      field: "lastUpdate",
      width: "10%",
      sortable: true,
    },
    {
      label: "Ações",
      field: "actions",
      width: "10%",
    },
  ],
  rows: projects.value,
  totalRecordCount: 0,
  sortable: {
    order: "name",
    sort: "desc",
  },
});

const updateCheckedRows = (rowsKey: any) => {};

watch(
  () => nameSearch.value,
  (val) => {
    console.log("nameSearch", val);
  }
);

const openEditProjectModal = (projectID: string): void => {
  console.log("projectID", projectID);
  projectId.value = projectID;
  isEditProjectModalOpen.value = true;
};

const closeCreateEditProjectModal = (): void => {
  projectId.value = "";
  isCreateProjectModalOpen.value = false;
  isEditProjectModalOpen.value = false;
};

const deleteProject = (projectID: string): void => {
  isDeleteProjectModalOpen.value = false;
  apiDeleteProject(projectID).then((data) => {
    projectId.value = "";
    if (data.status === 200) {
      ui.setSnackbar(true, "", "Projeto excluído com sucesso!", "success");
      window.location.reload();
    }
  });
};

const openDeleteProjectModal = (projectID: string): void => {
  projectId.value = projectID;
  isDeleteProjectModalOpen.value = true;
};

const closeDeleteProjectModal = (): void => {
  projectId.value = "";
  isDeleteProjectModalOpen.value = false;
};
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="mask"></div>
      <div class="header-content">
        <Breadcrumbs class="z-10" :routes="routes" />
        <div class="page-button-wrapper">
          <TitleH1 class="page-title">Intervenções na cidade</TitleH1>
          <Button
            class="-primary justify-self-end"
            @click="isCreateProjectModalOpen = true"
          >
            <span
              class="iconify mr-2"
              data-icon="mdi:plus"
              data-width="24px"
              data-height="24px"
            />
            Adicionar
          </Button>
        </div>
      </div>
    </header>
    <main class="interventions-container">
      <TextBodySmall id="page-description">
        São projetos da cidade do Recife. Para mais informações detalhadas, confira a
        página específica do projeto.
      </TextBodySmall>

      <div class="projects-filtering-container">
        <div class="search-fields">
          <Textfield
            labelColor="secondary"
            id="project"
            label="Projeto"
            name="project"
            placeholder="Projeto"
            minWidth="300px"
            icon="mdi:magnify"
            :valueModel="nameSearch"
            @update:value="nameSearch = $event"
          />
          <Textfield
            labelColor="secondary"
            id="local"
            label="Local"
            name="location"
            minWidth="200px"
            placeholder="Local"
            icon="mdi:magnify"
            :valueModel="locationSearch"
            @update:value="locationSearch = $event"
          />
          <Textfield
            labelColor="secondary"
            id="responsible"
            label="Responsável"
            name="responsibleOrg"
            minWidth="200px"
            placeholder="Responsável"
            icon="mdi:magnify"
            :valueModel="responsibleOrgSearch"
            @update:value="responsibleOrgSearch = $event"
          />

          <Textfield
            labelColor="secondary"
            id="partner"
            label="Parceiro"
            name="partner"
            minWidth="200px"
            placeholder="Parceiro"
            icon="mdi:magnify"
            :valueModel="partnersSearch"
            @update:value="partnersSearch = $event"
          />
          <Textfield
            labelColor="secondary"
            id="thematicGroups"
            label="Grupo Temático"
            name="thematicGroups"
            minWidth="200px"
            placeholder="Grupo temático"
            icon="mdi:magnify"
            :valueModel="thematicGroupsSearch"
            @update:value="thematicGroupsSearch = $event"
          />
        </div>
        <hr />
        <div class="map-toggle-and-filters-wrapper">
          <div class="map-toggle-wrapper">
            <Label> Ativar visualização no mapa </Label>
            <Toggle />
          </div>

          <div class="selected-filters-wrapper"></div>
        </div>
      </div>
      <TableLite
        :is-slot-mode="true"
        :has-checkbox="true"
        :is-re-search="table.isReSearch"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :is-loading="table.isLoading"
        @return-checked-rows="updateCheckedRows"
      >
        <template v-for="col in table.columns.slice(0, -1)" v-slot:[col.field]="data">
          <TextBodySmall>{{ data.value[col.field] }}</TextBodySmall>
        </template>
        <template v-slot:actions="data">
          <button @click="openEditProjectModal(data.value._id)">
            <span
              class="iconify mr-2"
              data-icon="mdi:pencil"
              data-width="24px"
              data-height="24px"
            />
          </button>
          <button @click="openDeleteProjectModal(data.value._id)">
            <span
              class="iconify mr-2"
              data-icon="mdi:trash-can"
              data-width="24px"
              data-height="24px"
            />
          </button>
        </template>
      </TableLite>
    </main>

    <BigModal
      :isOpen="isCreateProjectModalOpen || isEditProjectModalOpen"
      @close="closeCreateEditProjectModal()"
    >
      <CreateEditProjectForm :projectId="projectId" />
    </BigModal>

    <SmallModal :isOpen="isDeleteProjectModalOpen" @close="closeDeleteProjectModal()">
      <TitleH4 class="form-title">Excluir projeto</TitleH4>
      <TextBodySmall class="mt-4 mb-8">
        Tem certeza que deseja excluir o projeto?
      </TextBodySmall>
      <div class="flex">
        <Button
          class="-tertiary"
          @click="closeDeleteProjectModal()"
          style="margin-right: 10px"
        >
          Cancelar
        </Button>
        <Button
          class="-primary"
          @click="deleteProject(projectId)"
          style="margin-left: 10px"
        >
          Excluir
        </Button>
      </div>
    </SmallModal>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  @apply flex flex-col relative w-full;

  > header {
    @apply h-[200px] w-full;
    background-image: url(@/assets/images/notifications-page-map.png);
    background-repeat: no-repeat;
    background-size: cover;

    > .header-content {
      @apply mt-10 ml-40;

      > .page-button-wrapper {
        @apply flex items-center justify-between mt-[40px];

        > button {
          @apply mr-10;
        }

        .page-title {
          @apply text-brand-secondary-darkest;
        }
      }
    }
  }

  > .interventions-container {
    @apply flex flex-col;
    @apply w-full h-4/5 bg-neutrals-lightgrey-lightest py-10 px-40 shadow shadow-xl;

    > #page-description {
      @apply text-neutrals-darkgrey-medium mb-10;
    }

    > .projects-filtering-container {
      @apply p-3 border border-neutrals-lightgrey-medium rounded-lg mb-10;

      hr {
        @apply border-brand-secondary-light;
      }

      > .map-toggle-and-filters-wrapper {
        @apply flex justify-between items-center text-neutrals-darkgrey-dark my-[24px] mx-6;

        > .map-toggle-wrapper {
          @apply flex items-center;

          > label {
            @apply mr-2;
            white-space: nowrap;
          }
        }
      }

      > .search-fields {
        @apply flex flex-wrap gap-x-2 mb-4;
      }
    }

    /* ::v-deep(.vtl-paging-info) {
      display: none;
    }

    ::v-deep(.vtl-paging-change-div) {
      display: none;
    }

    ::v-deep(.vtl-paging-pagination-div) {
      display: none;
    } */

    ::v-deep(.vtl-tbody-checkbox) {
      @apply appearance-none;
      @apply bg-neutrals-lightgrey-lightest border-neutrals-darkgrey-lightest;
      border: 1px solid;
      border-radius: 4px;
      height: 20px;
      width: 20px;
      display: inline-block;
      position: relative !important;
      padding: 0 0 0 0px;
      z-index: 1;
      opacity: 1;

      &:checked {
        @apply bg-neutrals-lightgrey-lightest;

        background-image: url("@assets/icons/tick.png");
        background-repeat: no-repeat;
        background-size: contain;
        height: 20px;
        width: 20px;
        display: inline-block;
        padding: 0 0 0 0px;
      }
    }

    ::v-deep(.vtl-thead-checkbox) {
      @apply appearance-none;
      @apply bg-neutrals-lightgrey-lightest border-neutrals-darkgrey-lightest;
      border: 1px solid;
      border-radius: 4px;
      height: 20px;
      width: 20px;
      display: inline-block;
      position: relative !important;
      padding: 0 0 0 0px;
      z-index: 1;
      opacity: 1;

      &:checked {
        background-image: url("@assets/icons/tick.png");
        background-repeat: no-repeat;
        background-size: contain;
        height: 20px;
        width: 20px;
        display: inline-block;
        padding: 0 0 0 0px;
      }
    }

    ::v-deep(.vtl-thead-th) {
      @apply bg-brand-secondary-dark border border-neutrals-lightgrey-lightest text-neutrals-lightgrey-lightest;

      //styleName: Support / Overline;
      font-family: Roboto;
      font-size: 12px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0.005em;
      text-align: left;
      border: none;

      &:first-child {
        border-top-left-radius: 15px;
      }

      &:last-child {
        border-top-right-radius: 15px;
      }
    }

    ::v-deep(.vtl-thead-tr) {
      border: none;
    }

    ::v-deep(.vtl-table tr) {
      @apply bg-neutrals-lightgrey-lightest;

      &:nth-child(even) {
        @apply bg-neutrals-lightgrey-light;
      }

      &:hover {
        @apply bg-neutrals-lightgrey-medium;
      }
    }

    ::v-deep(.vtl-table td) {
      @apply text-neutrals-darkgrey-medium;
      border: none;
      //styleName: Support/Text Small;
      /* font-family: Roboto;
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0.02em;
      text-align: left; */
    }

    ::v-deep(.vtl-table tr) {
      border: none;
    }
  }
}
</style>
