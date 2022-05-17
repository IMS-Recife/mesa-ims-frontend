<route lang="yaml">
name: interventions
meta:
  layout: sidebar_layout
</route>

<script setup lang="ts">
import TableLite from "vue3-table-lite/ts";

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
    name: "Parque Capibaribe",
    location: "Recife-PE",
    completedPercentage: "75%",
    responsibleOrg: "URB",
    partners: "SDECTI, INCITI/UFPE",
    thematicGroups: "Urbanismo, Meio ambiente, Saneamento básico",
    lastUpdate: "30/08/2021",
  },
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
    name: "Parque Capibaribe",
    location: "Recife-PE",
    completedPercentage: "75%",
    responsibleOrg: "URB",
    partners: "SDECTI, INCITI/UFPE",
    thematicGroups: "Urbanismo, Meio ambiente, Saneamento básico",
    lastUpdate: "30/08/2021",
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
  <div class="interventions-container">
    <TextBodySmall>
      São projetos da cidade do Recife. Para mais informações detalhadas, confira a página
      específica do projeto.
    </TextBodySmall>

    <div class="search-fields">
      <Textfield
        labelColor="secondary"
        id="project"
        label="Projeto"
        name="project"
        placeholder="Projeto"
        minWidth="272px"
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
  </div>
</template>
<style lang="scss" scoped>
.interventions-container {
  @apply flex flex-col;
  @apply w-full h-4/5 bg-neutrals-lightgrey-lightest z-1000 px-40 py-[32px] shadow shadow-lg;

  > .search-fields {
    @apply flex flex-wrap gap-x-2;
  }

  ::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
    @apply bg-brand-secondary-dark border border-brand-secondary-dark text-neutrals-lightgrey-lightest;
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
</style>
