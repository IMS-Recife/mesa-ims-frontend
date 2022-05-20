<script setup lang="ts">
import { showLayer } from "@/composables/useGeoJsonProjects/";
import { useMapStore } from "@/stores/map";
const props = defineProps<{
  layerName: string;
  layerCategory: string;
}>();
const mapStore = useMapStore();
const choseLayer = (value: boolean) => {
  if (props.layerName) {
    mapStore.setNameClearLayer(props.layerName);
  }
  mapStore.setNameClearLayer("");
  mapStore.setLayerCategory(props.layerCategory);
  mapStore.setLayerName(props.layerName);

  if (props.layerCategory === "uso do solo" && value) {
    showLayer("soilUsage", {
      soilCategories: [props.layerName],
    });
  } else if (props.layerCategory === "Licenciamento" && value) {
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
  } else if (props.layerCategory === "Arborização" && value) {
    switch (props.layerName) {
      case "Árvores estabelecidas":
        showLayer("tree");
        break;

      default:
        break;
    }
  } else if (props.layerCategory === "Indicadores" && value) {
    switch (props.layerName) {
      case "População (2010)":
      showLayer("tree");
        break;

      default:
        break;
    }
  } else if (!value) {
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
  } else if (!value) {
    mapStore.setNameClearLayer(props.layerName);
  }
};
</script>

<template>
  <Label class="layer-label">
    <Checkbox @update:value="choseLayer($event)" />

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
