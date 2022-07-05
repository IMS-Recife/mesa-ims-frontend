<script setup lang="ts">
import { useMapStore } from "@/stores/map";
import { useProjects } from "@/stores/projects";

import map_select_default from "@/assets/icons/map_select_default.svg";
import map_select_satelite from "@/assets/icons/map_select_satelite.svg";
import map_select_black from "@/assets/icons/map_select_black.svg";

const projectStore = useProjects();
const mapStore = useMapStore();

const route = useRoute();

onBeforeMount(() => {
  mapStore.setIsDisabledMap(true);
});

const layersCategories = [
  {
    name: "uso do solo",
    layers: [
      {
        name: "Habitacional",
      },
      {
        name: "Comercial",
      },
      {
        name: "Misto",
      },
      {
        name: "Industrial",
      },
      {
        name: "Educacional",
      },
      {
        name: "Especial",
      },
      {
        name: "Hospitalar",
      },
      {
        name: "Institucional",
      },
      {
        name: "Religioso",
      },
      {
        name: "Terreno",
      },
    ],
  },
  {
    name: "Licenciamento",
    layers: [
      {
        name: "Licenciamento urbanístico",
      },
      {
        name: "Licenciamento ambiental",
      },
    ],
  },
  {
    name: "Arborização",
    layers: [
      {
        name: "Árvores estabelecidas",
      },
    ],
  },
  {
    name: "Indicadores",
    layers: [
      {
        name: "População (2010)",
      },
      {
        name: "Percentual Domicilios Arborizacao 2010",
      },
    ],
  },
  // {
  //   name: "Edificações",
  //   layers: [
  //     {
  //       name: "Cheios x Vazios",
  //     },
  //   ],
  // },
];

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

function newVision() {
  setTimeout(() => {
    window.location.reload();
  }, 300);
}

function dicionary(label: string) {
  switch (label) {
    case "Corredores":
      return "Corredores ambientais";

    case "Macrozona":
      return "Limites legais";

    default:
      return label;
  }
}
</script>
<template>
  <div class="sidebar-vision-layout">
    <div class="box">
      <BoxTextInfo
        v-if="route.path === '/projects'"
        title="Parque Capibaribe"
        text="O Sistema de Gestão Georreferenciada Integrada é uma plataforma baseada no CITinova, apoiada pelo GEF, que está sendo desenvolvida pelo NGPD e ARIES."
        text-link="Ver perfil completo"
        link="http://parquecapibaribe.org/"
      />
      <BoxTextInfo
        v-if="mapStore.pinGeo && route.path === '/visions'"
        title="Sobre"
        :data-geo="mapStore.pinGeo"
        textLink="Saiba mais"
        complement-link="sobre os dados exibidos"
        link="http://parquecapibaribe.org/"
      />
      <div v-if="route.path === '/projects'" class="content-zones">
        <Label class="text-brand-secondary-medium"
          >Visualizar por Categorias
        </Label>
        <Toggle
          v-for="item in projectStore.projectZones"
          :text-label="dicionary(item.label)"
          @update:value="item.function"
        />
      </div>
      <div v-if="route.path === '/visions'" class="content-select-maps">
        <Label class="text-brand-secondary-medium">Tipos de mapas</Label>
        <SelectMapLayer
          :items="mapsLayers"
          width="100%"
          height="100%"
          :value-model="true"
        />
      </div>
      <LayersCollapseContainer
        :layersCategories="layersCategories"
        title="Camadas"
      />

      <Button
        v-if="route.path === '/visions'"
        class="-outlined -block mb-4"
        @click="newVision()"
      >
        Nova Visão
        <i class="icon-right">
          <span
            class="iconify"
            data-icon="ic:baseline-remove-red-eye"
            data-width="24"
            data-height="24"
          ></span>
        </i>
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-vision-layout {
  @apply absolute flex flex-col z-401 top-[0px] right-[0];

  > .box {
    @apply pt-5 border-solid border-gray-300 border-r-2 border-t-2 border-b-2 border-l-2 w-[320px] h-[100vh] bg-white flex flex-col gap-2 px-5 overflow-y-auto overflow-x-hidden;

    > button {
      @apply mt-2;
    }
  }
}

.content-zones {
  @apply flex flex-col gap-2;
}

.content-select-maps {
  @apply flex flex-col gap-2 my-6;

  > .select-map-layer {
    @apply flex flex-row justify-around;
  }
}
</style>
