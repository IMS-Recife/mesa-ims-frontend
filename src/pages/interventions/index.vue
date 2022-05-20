<route lang="yaml">
name: interventions
meta:
  layout: sidebar_layout
</route>

<script setup lang="ts">
import TableLite from "vue3-table-lite/ts";

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

const tableRows = [
  {
    name: "Parque Capibaribe",
    location: "Recife-PE",
    completedPercentage: "75%",
    responsibleOrg: "URB",
    partners: "SDECTI, INCITI/UFPE",
    thematicGroups: "Urbanismo, Meio ambiente, Saneamento básico",
    lastUpdate: "30/08/2021",
  },
  {
    name: "Cais da aurora",
    location: "Recife-PE",
    completedPercentage: "100%",
    responsibleOrg: "URB",
    partners: "CTTU,EMLURB",
    thematicGroups: "SDECTI",
    lastUpdate: "02/02/2021",
  },
  {
    name: "Mais vida nos morros",
    location: "Recife-PE",
    completedPercentage: "40%",
    responsibleOrg: "URB",
    partners: "CTTU, EMLURB",
    thematicGroups: "Urbanismo, Meio ambiente, Saneamento básico",
    lastUpdate: "05/03/2021",
  },
  {
    name: "Calçada legal",
    location: "Recife-PE",
    completedPercentage: "50%",
    responsibleOrg: "URB",
    partners: "SDECTI, INCITI/UFPE",
    thematicGroups: "Urbanismo, Meio ambiente, Saneamento básico",
    lastUpdate: "27/03/2021",
  },
];

const table = reactive({
  isLoading: false,
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
      sortable: true,
    },
    {
      label: "Grupo Temático",
      field: "thematicGroups",
      width: "10%",
      sortable: true,
    },
    {
      label: "Última Atualização",
      field: "lastUpdate",
      width: "10%",
      sortable: true,
    },
  ],
  rows: tableRows,
  totalRecordCount: 4,
  sortable: {
    order: "name",
    sort: "asc",
  },
});
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="mask"></div>
      <div class="header-content">
        <Breadcrumbs class="z-10" :routes="routes" />
        <div class="page-button-wrapper">
          <TitleH1 class="page-title">Intervenções na cidade</TitleH1>
          <Button class="-primary justify-self-end">
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

      <div class="search-fields">
        <Textfield
          labelColor="secondary"
          id="project"
          label="Projeto"
          name="project"
          placeholder="Projeto"
          minWidth="300px"
          icon="mdi:magnify"
        />
        <Textfield
          labelColor="secondary"
          id="local"
          label="Local"
          name="local"
          minWidth="200px"
          placeholder="Local"
          icon="mdi:magnify"
        />
        <Textfield
          labelColor="secondary"
          id="responsible"
          label="Responsável"
          name="responsible"
          minWidth="200px"
          placeholder="Responsável"
          icon="mdi:magnify"
        />

        <Textfield
          labelColor="secondary"
          id="partner"
          label="Parceiro"
          name="partner"
          minWidth="200px"
          placeholder="Parceiro"
          icon="mdi:magnify"
        />
        <Textfield
          labelColor="secondary"
          id="thematicGroup"
          label="Grupo Temático"
          name="thematicGroup"
          minWidth="200px"
          placeholder="Grupo temático"
          icon="mdi:magnify"
        />
      </div>

      <TableLite
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :is-loading="table.isLoading"
      />
    </main>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  @apply flex flex-col relative;

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

    > .search-fields {
      @apply flex flex-wrap gap-x-2 mb-4;
      @apply p-3 border border-neutrals-lightgrey-medium rounded-lg;
    }

    ::v-deep(.vtl-thead-th) {
      @apply bg-brand-secondary-dark border border-neutrals-lightgrey-lightest text-neutrals-lightgrey-lightest;
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

    ::v-deep(.vtl-table td),
    ::v-deep(.vtl-table tr) {
      border: none;
    }

    ::v-deep(.vtl-paging-info) {
      color: rgb(172, 0, 0);
    }

    ::v-deep(.vtl-paging-count-label),
    ::v-deep(.vtl-paging-page-label) {
      color: rgb(172, 0, 0);
    }

    ::v-deep(.vtl-paging-pagination-page-link) {
      border: none;
    }
  }
}
</style>
