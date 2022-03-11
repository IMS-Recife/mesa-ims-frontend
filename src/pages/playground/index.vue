<route lang="yaml">
name: playground
meta:
  layout: neutral
</route>

<script setup lang="ts">
import Toggle from "@/components/molecules/toggle/index.vue";
const layersCategories = [
  {
    name: "infraestrutura",
    layers: [
      {
        name: "teste",
      },
    ],
  },
  {
    name: "equipamentos públicos",
    layers: [
      {
        name: "teste",
      },
    ],
  },
  {
    name: "uso do solo",
    layers: [
      {
        name: "Residencial",
      },
      {
        name: "Comercial",
      },
      {
        name: "Serviços",
      },
      {
        name: "Empreedimentos de Impacto",
      },
    ],
  },
  {
    name: "legislação urbanística",
    layers: [
      {
        name: "teste",
      },
    ],
  },
  {
    name: "benefícios fiscais",
    layers: [
      {
        name: "teste",
      },
    ],
  },
];

const pagination = ref({
  currentPage: 3,
  totalPages: 10,
});
const updatePage = (page: number): void => {
  pagination.value.currentPage = page;
};
const sliderValues = [
  {
    number: 2,
    current: true,
    label: "2km",
  },
  {
    number: 4,
    current: false,
    label: "3km",
  },
  {
    number: 6,
    current: false,
    label: "5km",
  },
  {
    number: 8,
    current: false,
    label: "8km",
  },
  {
    number: 10,
    current: false,
    label: "10km",
  },
];
</script>

<template>
  <div>
    <div class="w-full overflow-hidden">
      <BoxTextInfo> </BoxTextInfo>
      <MapPopup title="parque capibaribe">
        <template v-slot:default>
          <TextSmall> Trecho Jardim Filtrantes </TextSmall>
        </template>
      </MapPopup>

      <InfoPopup title="Acesso do pedestre ao eixo de transportes">
        <template v-slot:default>
          <div class="-info-popup-content-row">
            <StatusLayers color="#f0f" />
            <TextSmall>Black layer</TextSmall>
          </div>
          <div class="-info-popup-content-row">
            <StatusCircle class="-negative-status-medium" />
            <TextSmall>Ruim (1000m)</TextSmall>
          </div>
          <div class="-info-popup-content-row">
            <StatusCircle class="-warning-status-medium" />
            <TextSmall>Regular (750m)</TextSmall>
          </div>
          <div class="-info-popup-content-row">
            <StatusCircle class="-positive-status-medium" />
            <TextSmall>Bom (500m)</TextSmall>
          </div>
        </template>
      </InfoPopup>

      <LayersCollapseContainer
        :layersCategories="layersCategories"
        title="Camadas"
      ></LayersCollapseContainer>

      <Pagination
        :currentPage="pagination.currentPage"
        :totalPages="pagination.totalPages"
        @update:currentPage="updatePage($event)"
      />

      <div class="px-6">
        <Slider
          :step="2"
          :context="sliderValues"
          :min="2"
          :max="sliderValues.length * 2"
          :selectedValue="2"
        />
      </div>

      <div class="p-6 w-[300px]">
        <Toggle text-label="texto aqui" @update:value="returnToggle" />
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
