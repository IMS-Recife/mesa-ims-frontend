import {
  BaseMap,
  GeoJson,
  LatLng,
  Marker,
  PanTo,
  SetView,
  TileLayer,
  Tools,
  Zones,
} from "@/@types";
import { acceptHMRUpdate, defineStore } from "pinia";

type State = {
  baseMap: BaseMap;
  tileLayer: TileLayer;
  markers: Marker[];
  marker: Marker;
  setView: SetView;
  panTo: PanTo;
  disabledMap: boolean;
  tools: Tools;
  zones: Zones[];
  layers: GeoJson[];
  polygon: GeoJson;
  currentRadiusLatLng: any;
  polyline: GeoJson[];
  circle: GeoJson[];
  rectangle: GeoJson[];
  point: GeoJson[];
  groupPolygon: GeoJson[];
  radius: number;
  areaCurrent: GeoJson[];
  searchNameLayer: string;
  filterNameLayer?: Object;
  currentZone: any;
  nameClearZone: string | null;
  nameClearLayer: string | undefined;
  currentLayerCategory: any;
  currentLayerName: any;
  pinGeo: any;
  layersCurrentVision: any;
  countLayerRender: any;
};

export const useMapStore = defineStore("map", {
  state: (): State => ({
    tileLayer: {
      accessToken: `pk.eyJ1IjoiaXRhbG9iYXJyb3MxIiwiYSI6ImNrd2wxMzA1bDF4b2EycHFpMXFxczcxMGgifQ.26TUCPnafdyBqowYP_kDKA`,
      id: "mapbox/streets-v11",
      maxZoom: 18,
      minZoom: 6,
      attribution: `Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
    },
    baseMap: {
      center: [-8.0535802, -34.9087328],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    },
    markers: [],
    marker: {
      lat: 0,
      lng: 0,
      title: "",
      icon: {
        iconUrl: "",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [65, 65],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      },
    },
    setView: {
      center: [-7.9305165, -34.8293711],
      zoom: 13,
    },
    panTo: {
      latlng: [-7.9305165, -34.8293711],
    },
    disabledMap: false,
    tools: {
      isActiveMarkerMap: false,
      isClearMap: false,
      mapShouldClearLayers: false,
    },
    currentRadiusLatLng: null,
    searchNameLayer: "",
    filterNameLayer: undefined,
    layers: [],
    currentZone: null,
    zones: [],
    nameClearZone: null,
    nameClearLayer: "",
    currentLayerCategory: null,
    currentLayerName: undefined,
    radius: 0,
    polygon: {
      _id: "",
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [],
      },
      properties: {},
    },
    groupPolygon: [],
    polyline: [],
    circle: [],
    rectangle: [],
    point: [],
    areaCurrent: [],
    pinGeo: null,
    layersCurrentVision: [],
    countLayerRender: [],
  }),

  actions: {
    setPanTo(lat: number, lng: number) {
      this.panTo.latlng = [lat, lng];
    },
    setIsDisabledMap(isDisabled: boolean) {
      this.disabledMap = isDisabled;
    },
    setPushMarker(marker: Marker) {
      this.markers.push(marker);
    },
    setMakerOne(marker: Marker) {
      this.marker = marker;
    },
    clearMarkers(isClearMap: boolean) {
      this.tools.isClearMap = !isClearMap;
      this.setCurrentRadiusLatLng(null);
      this.markers.length = 0;
    },
    clearMap() {
      this.tools.mapShouldClearLayers = true;
      this.layersCurrentVision = [];
    },
    changeTileLayerStyle(id: string) {
      this.tileLayer.id = id;
    },
    setActiveMarkerMap(isActive: boolean) {
      this.tools.isActiveMarkerMap = !isActive;
    },
    setNewIdTileLayer(newIdStyleLayer: string) {
      this.tileLayer.id = newIdStyleLayer;
    },
    setViewMap(center: LatLng, zoom: number) {
      this.setView.center = center;
      this.setView.zoom = zoom;
    },
    setRadius(radius: number) {
      this.radius = radius;
    },
    setZones(payload: any) {
      this.zones.push(payload);
    },
    setCurrentRadiusLatLng(payload: any) {
      this.currentRadiusLatLng = payload;
    },
    setZonesClear() {
      this.zones.length = 0;
    },
    setPolygon(payload: any) {
      this.polygon = payload;
    },
    setGroupPolygon(payload: any) {
      this.groupPolygon = payload;
    },
    setAreaCurrent(payload: any) {
      this.areaCurrent = payload;
    },
    setLayers(payload: any) {
      this.layers = payload;
    },
    setSearchNameLayer(payload: any) {
      this.searchNameLayer = payload;
    },
    setFilterNameLayer(payload: any) {
      if (payload === undefined) {
        this.filterNameLayer = undefined;
      } else {
        this.filterNameLayer = payload;
      }
    },
    setCurrentZone(payload: any) {
      this.currentZone = payload;
    },
    setNameClearZone(payload: any) {
      this.nameClearZone = payload;
    },
    setNameClearLayer(payload: string) {
      this.nameClearLayer = payload;
      // this.layersCurrentVision.filter((layer: any) => {
      //   if (layer.name === payload) {
      //     this.unsetLayersCurrentVision(layer);
      //   }
      // });
    },
    setLayerCategory(payload: any) {
      this.currentLayerCategory = payload;
    },
    setLayerName(layer: any) {
      this.currentLayerName = layer;

      if (layer) {
        switch (layer) {
          case "Misto":
            this.setLayersCurrentVision(layer, "#6A5ACD");
            break;
          case "Habitacional":
            this.setLayersCurrentVision(layer, "#1E90FF");
            break;
          case "Comercial":
            this.setLayersCurrentVision(layer, "#40E0D0");
            break;
          case "Industrial":
            this.setLayersCurrentVision(layer, "#400036");
            break;
          case "Institucional":
            this.setLayersCurrentVision(layer, "#CD5C5C");
            break;
          case "Especial":
            this.setLayersCurrentVision(layer, "#FFF0F5");
            break;
          case "Hospitalar":
            this.setLayersCurrentVision(layer, "#FF81D0");
            break;
          case "Religioso":
            this.setLayersCurrentVision(layer, "#F2CB05");
            break;
          case "Terreno":
            this.setLayersCurrentVision(layer, "#0CF25D");
            break;
          case "Educacional":
            this.setLayersCurrentVision(layer, "#30A5BF");
            break;
          case "Licenciamento urbanístico":
            this.setLayersCurrentVision(layer, "#7B68EE");
            break;
          case "Licenciamento ambiental":
            this.setLayersCurrentVision(layer, "#32CD32");
            break;
          case "Árvores estabelecidas":
            this.setLayersCurrentVision(layer, "#006400");
            break;
          case "Cheios x Vazios":
            this.setLayersCurrentVision("Vazios", "#f9f9f9");
            this.setLayersCurrentVision("Cheios", "#242424");
            break;
          case "População (2010)":
            this.setLayersCurrentVision(layer, "#23192d");
            break;
          case "Percentual Domicilios Arborizacao 2010":
            this.setLayersCurrentVision(layer, "#4C5312");
            break;
          case "Percentual Domicilios Com Rampa Cadeirante no Entorno 2010":
            this.setLayersCurrentVision(layer, "#1c2130");
            break;
          case "Percentual Populacao Com Agua Encanada 2010":
            this.setLayersCurrentVision(layer, "#493736");
            break;
          case "Percentual Populacao Com Coleta de Lixo 2010":
            this.setLayersCurrentVision(layer, "#300030");
            break;
          case "Percentual Populacao Com Esgotamento Sanitario 2010":
            this.setLayersCurrentVision(layer, "#eb9c4d");
            break;
          case "Renda Media 2010":
            this.setLayersCurrentVision(layer, "#92a68a");
            break;
          case "Numero de Domicilios 2010":
            this.setLayersCurrentVision(layer, "#2a2829");
            break;
          case "Densidade Demografica 2010":
            this.setLayersCurrentVision(layer, "#2e1437");
            break;
          case "Crescimento Populacional 2000 2010":
            this.setLayersCurrentVision(layer, "#7d1a0c");
            break;
          case "Estação de Metro":
            this.setLayersCurrentVision(layer, "#7dd70c");
            break;
          case "Faixa Azul":
            this.setLayersCurrentVision(layer, "#000159");
            break;
          case "Linha de Metro":
            this.setLayersCurrentVision(layer, "#ffa232");
            break;
          default:
            console.log(layer);
            break;
        }
      }
    },
    setPinGeo(payload: any) {
      this.pinGeo = payload;
    },
    setLayersCurrentVision(layer: any, color: string) {
      const results = this.layersCurrentVision;
      results.push({
        name: layer,
        color: color,
      });
      this.setResultLayerCurrentVision(results);
    },
    setResultLayerCurrentVision(payload: any) {
      this.layersCurrentVision = payload;
    },
    setResultCountLayerRender(payload: any) {
      this.countLayerRender = payload;
    },
    setCountLayerRender(count: number, layer: any) {
      const resultsCount = this.countLayerRender;
      resultsCount.push({
        count: count,
        layer: layer,
      });
    },
    unsetLayersCurrentVision(layerName: string) {
      const valuesToRemove = layerName;
      const result = this.layersCurrentVision.filter((item: any) => {
        return item.name !== valuesToRemove;
      });

      const resultsCount = this.countLayerRender.filter((item: any) => {
        return item.layer !== valuesToRemove;
      });

      this.setResultLayerCurrentVision(result);
      this.setResultCountLayerRender(resultsCount);
    },
  },

  getters: {
    isDisabledMap: (state) => state.disabledMap,
    isActiveMarkerMap: (state) => state.tools.isActiveMarkerMap,
    isClearMap: (state) => state.tools.isClearMap,
    getZones: (state) => state.zones,
    getPolygon: (state) => state.polygon,
    getGroupPolygon: (state) => state.groupPolygon,
    getPolyline: (state) => state.polyline,
    getPoint: (state) => state.point,
    getRadius: (state) => state.radius,
    getSearchNameLayer: (state) => state.searchNameLayer,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
