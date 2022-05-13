<route lang="yaml">
name: interventions
meta:
  layout: dashboard_default
</route>

<script setup lang="ts"></script>

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
      />
      <Textfield
        labelColor="secondary"
        id="local"
        label="Local"
        name="local"
        minWidth="200px"
        placeholder="Local"
      />
      <Textfield
        labelColor="secondary"
        id="responsible"
        label="Responsável"
        name="responsible"
        minWidth="200px"
        placeholder="Responsável"
      />

      <Textfield
        labelColor="secondary"
        id="partner"
        label="Parceiro"
        name="partner"
        minWidth="200px"
        placeholder="Parceiro"
      />
      <Textfield
        labelColor="secondary"
        id="thematicGroup"
        label="Grupo Temático"
        name="thematicGroup"
        minWidth="200px"
        placeholder="Grupo temático"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.interventions-container {
  @apply flex flex-col absolute bottom-0;
  @apply w-full h-4/5 bg-neutrals-lightgrey-lightest z-300 px-40 py-[32px] shadow shadow-lg;

  > .search-fields {
    @apply flex flex-wrap gap-x-2;
  }
}
</style>
