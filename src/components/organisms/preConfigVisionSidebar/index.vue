<script setup lang="ts">
import { useMapStore } from "@stores/map";
import { useUIStore } from "@/stores/ui";

import map_select_default from "@/assets/icons/map_select_default.svg";
import map_select_satelite from "@/assets/icons/map_select_satelite.svg";
import map_select_black from "@/assets/icons/map_select_black.svg";
import pin_control_option from "@/assets/icons/pin_control_option.svg";
import pin_control_option_off from "@/assets/icons/pin_control_option_off.svg";

const mapStore = useMapStore();
const ui = useUIStore();

onMounted(() => {
  mapStore.setIsDisabledMap(true);
});

const finishConfig = reactive({
  label: "Aplicar visão",
  class: "",
  function: () => {
    ui.togglePreConfigSidebarVision(false);
    mapStore.setActiveMarkerMap(true);
  },
});

const mapsLayers = reactive([
  {
    label: "Padrão",
    class: "",
    imageLayer: map_select_default,
    function: () => {
      mapStore.setNewIdTileLayer("italobarros1/ckzcqqbzb000x15nu88q50nwh");
    },
    checked: true,
  },
  {
    label: "Satelite",
    class: "",
    imageLayer: map_select_satelite,
    function: () => {
      mapStore.setNewIdTileLayer("italobarros1/ckzcqu2g2000y15nuqrho493x");
    },
    checked: false,
  },
  {
    label: "Black",
    class: "",
    imageLayer: map_select_black,
    function: () => {
      mapStore.setNewIdTileLayer("italobarros1/ckzcre1w9002n14p9noyn1r01");
    },
    checked: false,
  },
]);

const sliderValues = [
  {
    number: 1,
    current: true,
    label: "1km",
  },
  {
    number: 2,
    current: false,
    label: "2km",
  },
  {
    number: 3,
    current: false,
    label: "3km",
  },
];
</script>
<template>
  <div class="pre-config-sidebar-vision-layout">
    <div class="box">
      <div class="box-header">
        <Title title="Configurando o Mapa" />
        <TextBodyMedium>
          Para uma melhor experiência, nos diga como você gostaria de ver o
          mapa.
        </TextBodyMedium>
      </div>

      <div class="box-select-map">
        <TitleH4>Selecione o tipo de Mapa </TitleH4>
        <SelectMapLayer
          :items="mapsLayers"
          width="100%"
          height="100%"
          :value-model="true"
        />
      </div>

      <div class="box-select-area-group">
        <TitleH4>Selecione uma área no Mapa</TitleH4>
        <div class="select-area-tools">
          <ButtonIconCheck
            :path="
              mapStore.isActiveMarkerMap
                ? pin_control_option
                : pin_control_option_off
            "
            width="40px"
            height="32px"
            alt="Pin"
            @action="mapStore.setActiveMarkerMap(mapStore.isActiveMarkerMap)"
          />

          <div
            v-if="
              mapStore.isActiveMarkerMap &&
              mapStore.getRadius > 0 &&
              mapStore.currentRadiusLatLng
            "
            class="content-slider"
          >
            <Slider
              :step="1"
              :context="sliderValues"
              :min="1"
              :max="sliderValues.length * 1"
              :selectedValue="1"
              @update="mapStore.setRadius(Number($event))"
            />
          </div>
        </div>
      </div>

      <div class="box-finish-config">
        <Button
          class="-secondary -block"
          :class="mapStore.areaCurrent.length > 0 ? '' : '-disabled'"
          :disabled="mapStore.areaCurrent.length > 0 ? false : true"
          @click="finishConfig.function()"
        >
          {{ finishConfig.label }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pre-config-sidebar-vision-layout {
  @apply absolute flex flex-col z-405 top-[0px] right-[0];
  > .box {
    @apply border-transparent  w-[524px] h-[100vh] bg-white flex-col p-6 pb-6 justify-center items-center;
    > button {
      @apply mt-2;
    }
  }
}

.box-header {
  @apply pt-12 pb-8 w-[312px] flex flex-col gap-2;
  margin: auto;
}

.box-select-map {
  @apply pb-8 w-[312px] flex flex-col gap-5;
  margin: auto;
}

.box-select-area-group {
  @apply pb-8 w-[312px] flex flex-col gap-7;
  margin: auto;

  > .select-area-tools {
    @apply flex flex-col gap-7;
  }
}

.box-finish-config {
  @apply pb-8 w-[312px] flex flex-col gap-7;
  margin: auto;
}
</style>
