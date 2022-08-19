<route lang="yaml">
name: project
meta:
  layout: dashboard_default
</route>

<script setup lang="ts">
import { showZona } from "@/composables/useGeoJsonProjects/";
import { getProjectForName } from "@/composables/useProjects/";
import { useUIStore } from "@/stores/ui";
import { useMapStore } from "@/stores/map";
import { useProjects } from "@/stores/projects";
const ui = useUIStore();

const projectStore = useProjects();
const mapStore = useMapStore();
const zones = ref<any>([]);

onBeforeMount(() => {
  getProjectForName("Parque Capibaribe");
  mapStore.clearMarkers(mapStore.isClearMap);
});

watch(
  () => projectStore.currentProject,
  (value) => {
    if (value) {
      let zoneParkArea = "";
      projectStore.currentProject.areas.forEach((area: any) => {
        zones.value.push({
          label: area.name,
          id: projectStore.currentProject._id,
          function: (value: boolean) => {
            if (value) {
              showZona(area.name, projectStore.currentProject._id)
                .then((response) => {
                  mapStore.setCurrentZone(response[0]);
                })
                .catch((error) => {
                  console.log(error);
                })
                .finally(() => {
                  ui.toggleLoading(false);
                });
            } else {
              mapStore.setNameClearZone(area.name);

              setTimeout(() => {
                mapStore.setNameClearZone("Zona Parque");
                mapStore.setCurrentZone(zoneParkArea);
              }, 300);
            }
          },
        });

        if (area.name === "Zona Parque") {
          showZona(area.name, projectStore.currentProject._id)
            .then((response) => {
              mapStore.setCurrentZone(response[0]);
              zoneParkArea = response[0];
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              ui.toggleLoading(false);
            });
          const valuesToRemove = area.name;
          const result = zones.value.filter((item: any) => {
            return item.label !== valuesToRemove;
          });

          zones.value = result;
        }
        ui.toggleLoading(false);
      });
      console.log("Zones", zones.value);
      projectStore.setProjectZones(zones.value);
    }
  }
);

ui.toggleSidebarVision(true);
ui.togglePreConfigSidebarVision(false);
</script>

<template>
  <div class="page-vision"></div>
</template>
<style lang="scss"></style>
