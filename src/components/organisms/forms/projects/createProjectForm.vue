<script setup lang="ts"></script>

<template>
  <form>
    <TitleH4 class="form-title">Novo projeto</TitleH4>
    <div class="project-field-section">
      <Overline class="section-title">SOBRE</Overline>
      <fieldset>
        <Textfield label="Nome" placeholder="Nome do projeto" minWidth="400px" />
        <Textfield
          label="Orgão responsável"
          placeholder="Orgão responsável"
          minWidth="400px"
        />
        <Textfield
          label="Link de referência"
          placeholder="Link de referência"
          minWidth="400px"
        />
        <DatePickerField label="Data de início" />
        <Textfield
          label="Quantidade prevista"
          placeholder="Quantidade prevista"
          minWidth="400px"
        />
        <Textfield
          label="Quantidade executada"
          placeholder="Quantidade executada"
          minWidth="400px"
        />
        <Textfield
          label="Valor do projeto"
          placeholder="Valor do projeto"
          minWidth="400px"
        />
        <Textfield label="Valor da obra" placeholder="Valor da obra" minWidth="400px" />
        <Textfield
          label="Tamanho das infiltrações"
          placeholder="Tamanho das infiltrações"
          minWidth="400px"
        />
        <Textfield
          label="Porcentagem concluída"
          placeholder="Porcentagem concluída"
          minWidth="400px"
        />
      </fieldset>
    </div>

    <div class="project-field-section">
      <Overline class="section-title">RELAÇÕES</Overline>
      <fieldset>
        <Textfield label="ODS*" placeholder="Objt. Desen. Sust." minWidth="400px" />
        <Textfield
          label="Porcentagem concluída"
          placeholder="Porcentagem concluída"
          minWidth="400px"
        />
      </fieldset>
    </div>

    <div class="partners-field-section">
      <Overline class="section-title">PARCEIROS</Overline>
      <fieldset class="partners-fields">
        <Textfield label="Responsável" placeholder="Responsável" minWidth="350px" />
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
        </button>
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
  </form>

  <Button class="-primary mt-20 ml-auto" disabled>ENVIAR</Button>
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
