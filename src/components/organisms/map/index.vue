<script setup lang="ts">
import { Marker } from "@/@types";
import { useMapStore } from "@stores/map";
import { useUIStore } from "@/stores/ui";
import {
  callLayer,
  callPropertiesLayerByLocation,
  trataDataProperties,
} from "@/composables/useGeoJsonProjects";
import pin from "@/assets/icons/pin.svg";
import * as turf from "@turf/turf";
import { getCurrentInstance } from "vue";

const app = getCurrentInstance();
import("leaflet/dist/leaflet.css");

const mapStore = useMapStore();
const ui = useUIStore();

const tilesPolygon = ref<any>();
const tilePolygonCheios = ref<any>();
const tilePolygonVazios = ref<any>();

const tilesPoint = ref<any>();

onBeforeMount(async () => {
  const L = await import("leaflet");
  mapStore.setSearchNameLayer(undefined);
  mapStore.setAreaCurrent(0);
  mapStore.setNameClearLayer(mapStore.searchNameLayer);
  mapStore.setResultCountLayerRender([]);
  mapStore.setResultLayerCurrentVision([]);

  const VT = app?.appContext.config.globalProperties.$VT;

  const mapAPI = L.map("map-default", {
    preferCanvas: true,
    center: mapStore.baseMap.center,
    zoom: mapStore.baseMap.zoom,
    zoomControl: mapStore.baseMap.zoomControl,
    attributionControl: mapStore.baseMap.attributionControl,
  });

  watch(
    () => mapStore.isActiveMarkerMap,
    (newValue) => {
      const mapHtml = mapAPI.getContainer();
      if (mapStore.isDisabledMap && newValue) {
        L.DomUtil.addClass(mapHtml, "custom-cursor");

        mapAPI.on("click", (e: any) => {
          mapAPI.eachLayer((layers: any) => {
            if (layers.options.className === "marker-map") {
              layers.remove();
            }
            if (layers.options.className === "radius-current-zone-polygon") {
              layers.remove();
            }
          });

          mapStore.setPanTo(e.latlng.lat, e.latlng.lng);
          mapStore.setMakerOne({
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            title: "",
            icon: {
              iconUrl: pin,
              shadowUrl: "",
              iconSize: [65, 65],
              iconAnchor: [32, 44],
              popupAnchor: [0, 0],
            },
          });
          mapStore.setRadius(0);
          setTimeout(() => {
            mapStore.setRadius(1);
          }, 10);
        });
      } else {
        L.DomUtil.removeClass(mapHtml, "custom-cursor");
        mapAPI.off("click");
      }
    }
  );

  watch(mapStore.markers, (newValue) => {
    newValue.map((marker) => {
      const Lmakers = L.marker([marker.lat, marker.lng], {
        title: marker.title,
        icon: L.icon(marker.icon),
        className: "markers-map",
      } as Marker);

      Lmakers.addTo(mapAPI);

      return;
    });
  });
  watch(
    () => mapStore.marker,
    (newValue) => {
      const Lmaker = L.marker([newValue.lat, newValue.lng], {
        title: newValue.title,
        icon: L.icon(newValue.icon),
        className: "marker-map",
      } as Marker);
      mapStore.setCurrentRadiusLatLng(Lmaker.getLatLng());
      Lmaker.addTo(mapAPI);
      return;
    }
  );
  watch(
    () => mapStore.isClearMap,
    () => {
      mapAPI.eachLayer((layers: any) => {
        if (layers.options.className === "polygon-map") {
          layers.remove();
        }
        if (layers.options.className === "marker-map") {
          layers.remove();
        }
        if (layers.options.className === "radius-current-zone-polygon") {
          layers.remove();
        }
        if (layers.options.className === "point-map") {
          layers.remove();
        }
        if (layers.options.className === "layer-api") {
          layers.remove();
        }
        if (layers.options.name === "layer-polygon") {
          layers.remove();
        }
        if (layers.options.name === "layer-point") {
          layers.remove();
        }
      });

      mapStore.setAreaCurrent(0);
      mapStore.layersCurrentVision.forEach((layer: any) => {
        mapAPI.eachLayer((layers: any) => {
          if (layers.options.className === `polygon-map-${layer.name}`) {
            layers.remove();
          }
          if (layers.options.className === `point-map-${layer.name}`) {
            layers.remove();
          }
          if (layers.options.className === `layer-polygon-${layer.name}`) {
            layers.remove();
          }
          if (layers.options.className === `layer-point-${layer.name}`) {
            layers.remove();
          }
        });
      });
      ui.toggleSidebarVision(false);
      setTimeout(() => {
        mapStore.setResultLayerCurrentVision([]);
        ui.toggleSidebarVision(true);
      }, 300);
    }
  );

  watch(
    () => mapStore.nameClearZone,
    (newValue) => {
      mapAPI.eachLayer((layers: any) => {
        if (layers.options.className === `polygon-map-${newValue}`) {
          layers.remove();
        }
      });
    }
  );

  watch(
    () => mapStore.nameClearLayer,
    (newValue) => {
      mapAPI.eachLayer((layers: any) => {
        if (layers.options.className === `polygon-map-${newValue}`) {
          layers.remove();
        }
        if (layers.options.className === `point-map-${newValue}`) {
          layers.remove();
        }
        if (layers.options.className === `layer-polygon-${newValue}`) {
          layers.remove();
        }
        if (layers.options.className === `layer-point-${newValue}`) {
          layers.remove();
        }
      });
    },
    { immediate: true, deep: true }
  );

  watch(
    () => mapStore.tileLayer.id,
    () => {
      mapAPI.eachLayer((layer: any) => {
        layer.remove();
      });

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          maxZoom: mapStore.tileLayer.maxZoom,
          id: mapStore.tileLayer.id,
          tileSize: 512,
          accessToken: mapStore.tileLayer.accessToken,
          zoomOffset: -1,
          minZoom: mapStore.tileLayer.minZoom,
        }
      ).addTo(mapAPI);
    },
    { immediate: true }
  );

  watch(
    () => mapStore.isDisabledMap,
    () => {
      if (!mapStore.isDisabledMap) {
        mapAPI.dragging.disable();
        mapAPI.touchZoom.disable();
        mapAPI.doubleClickZoom.disable();
        mapAPI.scrollWheelZoom.disable();
        mapAPI.boxZoom.disable();
        mapAPI.keyboard.disable();
      }
      if (mapStore.isDisabledMap) {
        mapAPI.dragging.enable();
        mapAPI.touchZoom.enable();
        mapAPI.doubleClickZoom.enable();
        mapAPI.scrollWheelZoom.enable();
        mapAPI.boxZoom.enable();
        mapAPI.keyboard.enable();
      }
    },
    { immediate: true }
  );

  watch(mapStore.panTo, () => {
    mapAPI.panTo(mapStore.panTo.latlng);
  });

  watch(
    () => mapStore.searchNameLayer,
    async (value) => {
      if (value) {
        const responseShowLayer = await callLayer({
          layers: [
            {
              name: value,
              filter: mapStore.filterNameLayer,
            },
          ],
          buffer: 30,
          searchAreas: mapStore.areaCurrent,
        });

        let featCollectionPolygonForVector = {
          type: "FeatureCollection",
          features: [] as any,
        };

        let featCollectionPointVector = {
          type: "FeatureCollection",
          features: [] as any,
        };

        let color = "#7A577A";

        if (responseShowLayer[value].length <= 0) {
          ui.setSnackbar(
            true,
            "",
            "Não há dados catalogados nessa região.",
            "error"
          );
        }

        let contador = 0;

        responseShowLayer[value].forEach((el: any, index: number) => {
          if (el.geometry.type === "Point") {
            const point = L.geoJSON(el.geometry as any, {
              pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng).setStyle({
                  opacity: 0,
                  fillOpacity: 0,
                  stroke: false,
                });
              },
            });
            point.setStyle({
              className: `point-map-${mapStore.currentLayerName}`,
            });
            point
              .addTo(mapAPI)
              .on("click", (event: any) => {
                callPropertiesLayerByLocation(value, el._id).then((res) => {
                  L.popup()
                    .setLatLng(event.latlng)
                    .setContent(
                      `<div class="map-popup-container">
                  <div id="popup" class="-map-popup-title">
                  <ul>
                  ${trataDataProperties(res)}
                  </ul>
                  </div>
               </div>`
                    )
                    .openOn(mapAPI);
                });
              })
              .on("mouseover", (event: any) => {
                L.marker(event.latlng, {
                  className: "marker-map",
                  icon: L.icon({
                    iconUrl: `https://cdn-icons-png.flaticon.com/32/3892/3892652.png`,
                    iconAnchor: [12, 36],
                    popupAnchor: [1, -34],
                  }),
                } as any).addTo(mapAPI);
              })
              .on("mouseout", (event: any) => {
                mapAPI.eachLayer((layers: any) => {
                  if (layers.options.className === "marker-map") {
                    layers.remove();
                  }
                });
              });

            featCollectionPointVector.features.push(el);

            contador = responseShowLayer[value].length;
          } else {
            const layer = L.geoJSON(el.geometry as any);
            layer.setStyle({ opacity: 0, fillOpacity: 0, stroke: false });
            layer.setStyle({
              className: `polygon-map-${mapStore.currentLayerName}`,
            });
            layer
              .addTo(mapAPI)
              .on("click", (event: any) => {
                callPropertiesLayerByLocation(value, el._id).then((res) => {
                  L.popup()
                    .setLatLng(event.latlng)
                    .setContent(
                      `<div class="map-popup-container">
                  <div id="popup" class="-map-popup-title">
                  <ul>
                  ${trataDataProperties(res)}
                  </ul>
                  </div>
               </div>`
                    )
                    .openOn(mapAPI);
                });
              })
              .on("mouseover", (event) => {
                layer.setStyle({
                  stroke: true,
                  color: "#f0f",
                  fillColor: "#f0f",
                  fillOpacity: 0.3,
                  opacity: 0.3,
                });
              })
              .on("mouseout", (event) => {
                layer.setStyle({
                  stroke: true,
                  color: "#f0f",
                  fillColor: "#f0f",
                  fillOpacity: 0,
                  opacity: 0,
                });
              });

            featCollectionPolygonForVector.features.push(el);

            contador = responseShowLayer[value].length;
          }
        });

        mapStore.layersCurrentVision.filter((element: any, index: any) => {
          if (element.name === mapStore.currentLayerName) {
            color = element.color;
            tilesPolygon.value = new VT(featCollectionPolygonForVector, {
              maxZoom: 18,
              tolerance: 50,
              bug: true,
              indexMaxPoints: 100000,
              className: `layer-polygon-${mapStore.currentLayerName}`,
              properties: "",
              zIndex: 850,
              pane: "tilePane",
              style: {
                color: color,
                fillColor: color,
                fillOpacity: 0.7,
              },
            });
            tilesPoint.value = new VT(featCollectionPointVector, {
              maxZoom: 18,
              tolerance: 50,
              bug: true,
              indexMaxPoints: 100000,
              className: `layer-point-${mapStore.currentLayerName}`,
              style: {
                color: color,
                fillColor: color,
                fillOpacity: 0.7,
              },
            });
            tilesPolygon.value.addTo(mapAPI);
            tilesPoint.value.addTo(mapAPI);
            mapStore.setCountLayerRender(contador, element.name);
          } else {
            if (value === "nonBuiltArea") {
              tilePolygonVazios.value = new VT(featCollectionPolygonForVector, {
                maxZoom: 18,
                tolerance: 50,
                bug: true,
                indexMaxPoints: 100000,
                className: `layer-polygon-${mapStore.currentLayerName}`,
                properties: "",
                zIndex: 850,
                pane: "tilePane",
                style: {
                  color: "#f9f9f9",
                  fillColor: "#f9f9f9",
                  fillOpacity: 0.6,
                },
              });

              tilePolygonVazios.value.addTo(mapAPI);
              mapStore.setCountLayerRender(contador, element.name);
            } else if (value === "builtArea") {
              tilePolygonCheios.value = new VT(featCollectionPolygonForVector, {
                maxZoom: 18,
                tolerance: 50,
                bug: true,
                indexMaxPoints: 100000,
                className: `layer-polygon-${mapStore.currentLayerName}`,
                properties: "",
                zIndex: 850,
                pane: "tilePane",
                style: {
                  color: element.color,
                  fillColor: element.color,
                  fillOpacity: 0.8,
                },
              });
              tilePolygonCheios.value.addTo(mapAPI);
              mapStore.setCountLayerRender(contador, element.name);
            }
          }

          ui.toggleLoading(true);

          function renderMap() {
            ui.toggleLoading(false);
            mapStore.setSearchNameLayer(undefined);
          }
          renderMap();
        });
      }
    },
    { immediate: false, deep: false, flush: "post" }
  );

  watch(
    () => mapStore.getRadius,
    (newValue: any) => {
      mapAPI.eachLayer((layers: any) => {
        if (layers.options.className === "radius-current-zone-polygon") {
          layers.remove();
        }
      });
      const point = {
        _id: "",
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            mapStore.currentRadiusLatLng.lng,
            mapStore.currentRadiusLatLng.lat,
          ],
        },
        properties: {},
      };

      let center = turf.centroid(point as any);
      let circle = turf.circle(center, newValue);
      const layerRadiusCurrentZone = L.geoJSON(circle).setStyle({
        className: "radius-current-zone-polygon",
      });

      mapAPI.addLayer(layerRadiusCurrentZone);

      const arrayCircleRadius = [circle.geometry];
      const area = turf.area(circle.geometry as any);

      mapStore.setAreaCurrent(arrayCircleRadius);

      layerRadiusCurrentZone.setStyle({
        color: "#7AC8C5",
        fillColor: "#7AC8C5",
        fillOpacity: 0.1,
        dashArray: "5, 10",
      });

      layerRadiusCurrentZone.addTo(
        mapAPI.setView(mapStore.currentRadiusLatLng, newValue < 8 ? 13 : 13 - 1)
      );

      const pinGeoData = {
        area: area.toFixed(2),
        long: mapStore.currentRadiusLatLng.lng,
        lat: mapStore.currentRadiusLatLng.lat,
      };

      mapStore.setPinGeo(pinGeoData);
    }
  );

  watch(
    () => mapStore.currentZone,
    async (newValue: any) => {
      const coord = L.geoJSON(newValue.locations).getBounds().getCenter();

      let color = "#E35016";
      switch (newValue.name) {
        case "Corredores":
          color = "#E35016";
          break;
        case "Infiltrações":
          color = "#7A577A";
          break;
        case "Macrozona":
          color = "#F2CB05";
          break;
        case "Trechos":
          color = "#E35016";
          break;
        case "Zona Parque":
          color = "#02735E";
          break;
        default:
          break;
      }

      const layerPolygon = L.geoJSON(newValue.locations).setStyle({
        color: color,
        fillColor: color,
        fillOpacity: 0.1,
        opacity: 0.5,
      });
      layerPolygon.setStyle({ className: `polygon-map-${newValue.name}` });

      let featCollectionLineString = {
        type: "FeatureCollection",
        features: [] as any,
      };

      let featCollectionPolygon = {
        type: "FeatureCollection",
        features: [] as any,
      };

      let area = 0;
      newValue.locations.forEach((el: any) => {
        if (el.geometry.type === "LineString") {
          featCollectionLineString.features.push(el);
        } else {
          featCollectionPolygon.features.push(el);
        }
      });

      if (featCollectionLineString.features.length > 0) {
        let featureCollection = featCollectionLineString;
        let bbox = turf.bbox(featureCollection);
        let bboxPolygon = turf.bboxPolygon(bbox);
        area = turf.area(bboxPolygon);
        mapStore.setAreaCurrent(
          featCollectionLineString.features.map((el: any) => {
            return el.geometry;
          })
        );
      }
      if (featCollectionPolygon.features.length > 0) {
        area = turf.area(featCollectionPolygon as any);

        mapStore.setAreaCurrent(
          featCollectionPolygon.features.map((el: any) => {
            return el.geometry;
          })
        );
      }
      let zoom = 13;
      if (area <= 196518) {
        zoom = 15;
      } else if (area >= 361171169) {
        zoom = 12;
      } else {
        zoom = 13;
      }
      layerPolygon.addTo(mapAPI.setView(coord, zoom));
    }
  );

  watch(
    () => mapStore.layersCurrentVision,
    (value) => {
      if (value.length > 0) {
        ui.toggleInfoPopupLayer(true);
      } else {
        ui.toggleInfoPopupLayer(false);
      }
    },
    { immediate: true, deep: true }
  );
});
</script>

<template>
  <main class="map">
    <div id="map-default"></div>
  </main>
</template>

<style lang="scss">
.custom-cursor {
  cursor: url("@/assets/icons/pin.svg") 4 12, auto;
}

.leaflet-container.custom-cursor {
  cursor: url("@/assets/icons/pin.svg") 4 12, auto;
}

#map-default {
  width: 100%;
  height: 100%;
}

.leaflet-popup-content {
  @apply p-0 flex justify-start items-center h-auto min-w-[255px];
  margin: 10px !important;
}
.map-popup-container {
  @apply flex p-0;
}

.-map-popup-title {
  @apply text-[12px] text-gray-900;

  > ul {
    list-style-type: none;
    > li {
      > span {
        @apply text-brand-secondary-darkest;
        font-weight: 700;
      }
      @apply py-1;
    }
  }
}

.leaflet-popup-content-wrapper {
  border-radius: 8px !important;
  border-left: solid 10px #00746b;
  min-height: 58px;
  height: auto !important;
}

.leaflet-popup-content {
}

.leaflet-popup-tip {
}
</style>
