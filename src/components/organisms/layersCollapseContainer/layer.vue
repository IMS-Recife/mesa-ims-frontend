<script setup lang="ts">
import { showLayer } from "@/composables/useGeoJsonProjects/";
import { useMapStore } from "@/stores/map";
const props = defineProps<{
  layerName: string;
  layerCategory: string;
}>();
const mapStore = useMapStore();
const unCheck = ref(false);

const choseLayer = (value: boolean) => {
  // mapStore.setNameClearLayer("");
  if (value) {
    mapStore.setLayerCategory(props.layerCategory);
    mapStore.setLayerName(props.layerName);

    if (props.layerCategory === "uso do solo") {
      showLayer("soilUsage", {
        soilCategories: [props.layerName],
      });
    } else if (props.layerCategory === "Licenciamento") {
      switch (props.layerName) {
        case "Licenciamento urbanístico":
          showLayer("urbanLicensing");
          break;
        case "Licenciamento ambiental":
          showLayer("environmentalLicensing");
          break;

        default:
          break;
      }
    } else if (props.layerCategory === "Arborização") {
      switch (props.layerName) {
        case "Árvores estabelecidas":
          showLayer("tree");
          break;

        default:
          break;
      }
    } else if (props.layerCategory === "Mobilidade") {
      switch (props.layerName) {
        case "Estação de Metro":
          showLayer("MetroStation");
          break;
        case "Faixa Azul":
          showLayer("BlueStrip");
          break;
        case "Linha de Metro":
          showLayer("MetroLine");
          break;
        case "Linha REC Total":
          showLayer("TotalRecifeLine");
          break;
        case "Malha Ciclo 2022":
          showLayer("CycleLaneMesh2022");
          break;
        case "Mobilidade Pedestre Urbanismo Tatico":
          showLayer("PedestrianMobilityTacticalUrbanism");
          break;

        default:
          console.log(props.layerName);
          break;
      }
    } else if (props.layerCategory === "Arborização") {
      switch (props.layerName) {
        case "Árvores estabelecidas":
          showLayer("tree");
          break;

        default:
          break;
      }
    } else if (props.layerCategory === "Indicadores") {
      switch (props.layerName) {
        case "População (2010)":
          showLayer("population2010");
          break;
        case "Percentual Domicilios Arborizacao 2010":
          showLayer("PercentageHouseholdsTrees");
          break;
        case "Percentual Domicilios Com Rampa Cadeirante no Entorno 2010":
          showLayer("PercentageHouseholdsWheelchairRampSurroundings2010");
          break;
        case "Percentual Populacao Com Agua Encanada 2010":
          showLayer("PercentagePopulationPiped2010");
          break;
        case "Percentual Populacao Com Coleta de Lixo 2010":
          showLayer("PercentagePopulationGarbageCollection2010");
          break;
        case "Percentual Populacao Com Esgotamento Sanitario 2010":
          showLayer("PercentagePopulationSanitarySewage2010");
          break;
        case "Renda Media 2010":
          showLayer("AverageIncome2010");
          break;
        case "Numero de Domicilios 2010":
          showLayer("NumberHouseholds2010");
          break;
        case "Densidade Demografica 2010":
          showLayer("DemographicDensity2010");
          break;
        case "Crescimento Populacional 2000 2010":
          showLayer("PopulationGrowth20002010");
          break;

        default:
          console.log(props.layerName);
          break;
      }
    } else if (props.layerCategory === "Edificações" && value) {
      switch (props.layerName) {
        case "Cheios x Vazios":
          showLayer("nonBuiltArea");
          setTimeout(() => {
            showLayer("builtArea");
          }, 3000);
          break;

        default:
          break;
      }
    }
  } else {
    mapStore.setNameClearLayer(props.layerName);
    mapStore.unsetLayersCurrentVision(props.layerName);
  }
};
</script>

<template>
  <Label class="layer-label">
    <Checkbox :uncheck="unCheck" @update:value="choseLayer($event)" />

    <span
      class="iconify layer-icon"
      data-icon="mdi:arrow-right"
      data-width="16"
    />
    {{ props.layerName }}
  </Label>
</template>

<style lang="scss" scoped>
.layer-label {
  @apply flex items-center justify-start text-neutrals-darkgrey-medium my-2;

  > .layer-icon {
    @apply text-neutrals-darkgrey-dark mx-1;
  }
}
</style>
