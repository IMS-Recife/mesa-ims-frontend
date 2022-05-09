<route lang="yaml">
name: home
meta:
  layout: dashboard_default
</route>

<script setup lang="ts">
  import { useMapStore } from "@stores/map";
  import { useUIStore } from "@/stores/ui";

  const ui = useUIStore();
  const mapStore = useMapStore();
  const menuShowing = ref(false);
  const aboutIMSModalShowing = ref(false);

  onBeforeMount(async () => {
    mapStore.clearMarkers(mapStore.isClearMap);
    ui.togglePreConfigSidebarVision(false);
    mapStore.setNameClearZone("");
    setTimeout(() => {
      mapStore.setNameClearZone("Zona Parque");
      ui.toggleSidebarVision(false);
    }, 400);
    mapStore.setAreaCurrent(0);
    // mapStore.setNameClearLayer(mapStore.searchNameLayer);
    mapStore.setResultCountLayerRender([]);
    mapStore.setResultLayerCurrentVision([]);
  });

  const showAboutIMSModal = (): void => {
    menuShowing.value = false;
    aboutIMSModalShowing.value = true;
  }

  const onBurgerButtonClick = (): void => {
    menuShowing.value = !menuShowing.value
    
    if (aboutIMSModalShowing.value) {
      aboutIMSModalShowing.value = false;
      menuShowing.value = false
    }
    
  }

</script>

<template>
  <div class="home-page">
    <div class="modal-buttons">
      <button 
        class="burger-button"
        @click="onBurgerButtonClick()"
      >
        <span 
            class="iconify"
            data-icon="mdi:menu"
            data-width="24"
            data-height="24"
        />
      </button>

      <button 
        class="modal-button" 
        v-if="menuShowing"
        @click="showAboutIMSModal"
      >
          <span 
            class="iconify"
            data-icon="mdi:information"
            data-width="20"
            data-height="20"
          />
      </button>
      <button class="modal-button" v-if="menuShowing">
          <span 
            class="iconify"
            data-icon="ps:label"
            data-width="20"
            data-height="20"
          />
      </button>

      <InfoModal
        v-if="aboutIMSModalShowing"
        title="Sobre o IMS"
      >
        <template #default>
          <TextBodySmall>
            O Sistema de Gestão Georreferenciada Integrada é uma plataforma baseada no CITinova, apoiada pelo GEF, que está sendo desenvolvida pelo NGPD e ARIES. 
          </TextBodySmall>
        </template>

        <template #footer>
          <LinkSmall>
            Ver perfil completo
          </LinkSmall>
        </template>      
      </InfoModal>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .home-page {
    @apply ;

    > .modal-buttons {
      @apply z-1000  absolute flex flex-col items-center right-0 top-0 mr-[20px] mt-[16px];
      > .burger-button {
        @apply flex;
        @apply  p-2 bg-brand-primary-medium text-neutrals-lightgrey-light rounded-full outline-none;

        &:hover {
          @apply bg-brand-primary-light
      }
    }
      > .modal-button {
        @apply flex  mt-2;
        @apply p-2 rounded-full bg-neutrals-lightgrey-light text-neutrals-darkgrey-medium outline-none;
      }
    }
  }
</style>
