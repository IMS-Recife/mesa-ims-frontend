import {
  apiGetDataGeoJsonProject,
  apiPostLayerGeoJson,
  apiGetPropertiesLayerByLocation,
} from "@services/map";
import { capitalize } from "@/composables/default/captalizer";
import { convertTimeUnixTime } from "@/composables/default/convertTime";
import { convertNumberToCurrency } from "@/composables/default/convertCurrency";
import { ProjectParams, LayerParams } from "@services/map/types";
import { useUIStore } from "@stores/ui";
import { useMapStore } from "@stores/map";

export async function getZonesProject(params: ProjectParams) {
  const mapStore = useMapStore();
  const ui = useUIStore();
  apiGetDataGeoJsonProject({
    areaName: params.areaName,
    projectId: params.projectId,
  })
    .then((response) => {
      response.data.forEach((element: any) => {
        mapStore.setZones(element);
        return;
      });
    })
    .catch((error) => {
      console.log(error, "error");
    });
}

export async function showZona(name: any, projectId: any) {
  const mapStore = useMapStore();

  return apiGetDataGeoJsonProject({
    areaName: name,
    projectId: projectId,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
}

export async function callLayer(params: LayerParams) {
  const ui = useUIStore();
  return await apiPostLayerGeoJson(params)
    .then((response) => {
      return response.data;
    })
    .catch((err: any) => {
      if (err.response) {
        const message = err.response.data.message;
        if (typeof err.response.data.message === "string") {
          ui.setSnackbar(true, "", message, "error");
        } else {
          ui.setSnackbar(true, "", message[0], "error");
        }
      }
    });
}

export async function showLayer(layer: string, filters?: Object) {
  const mapStore = useMapStore();
  mapStore.setSearchNameLayer(layer);
  mapStore.setFilterNameLayer(filters);
}

export function callPropertiesLayerByLocation(
  layerName: string,
  locationId: string
) {
  return apiGetPropertiesLayerByLocation({
    layerName: layerName,
    locationId: locationId,
  })
    .then((response: any) => {
      return response.data.properties;
    })
    .catch((error: any) => {
      console.log(error, "error apiGetPropertiesByLayer");
    });
}

export function trataDataProperties(data: any) {
  let message = "";
  for (const [key, value] of Object.entries(data)) {
    let formate;

    if (key === "﻿areatotalconstruida") {
      formate = key;
    } else {
      formate = key.toString().toUpperCase().replaceAll("_", "");
    }

    if (
      value === null ||
      value === "" ||
      key === "TIPOEMPREENDIMENTO" ||
      formate === "GLOBALID" ||
      formate === "OBJECTID"
    ) {
      delete data[key];
    } else {
      switch (formate) {
        case "ANCONSTR":
          message += `<li><span>Ano de construção:</span> ${value}</li>`;
          break;

        case "AREALOTE":
          message += `<li><span>Área do lote:</span> ${value} m²</li>`;
          break;

        case "﻿areatotalconstruida":
          message += `<li><span>Área total construída:</span> ${value} m²</li>`;
          break;

        case "ENDNUMERO":
          message += `<li><span>Número do endereço:</span> ${value}</li>`;
          break;

        case "NMENDCOMP":
          message += `<li><span>Endereço corporativo:</span> ${value}</li>`;
          break;

        case "NMTIPOEMPRENDIMENTO":
          message += `<li><span>Tipo de empreendimento:</span> ${capitalize(
            value
          )}</li>`;
          break;

        case "SITUACAOIMOVEL":
          message += `<li><span>Situação do imóvel:</span> ${capitalize(
            value
          )}</li>`;
          break;

        case "QTDPAVIMENTOS":
          message += `<li><span>Quantidade de pavimentos:</span> ${value}</li>`;
          break;

        case "QTDUNHAB":
          message += `<li><span>Quantidade de unidades habitáveis:</span> ${value}</li>`;
          break;

        case "LASTEDITEDDATE":
          message += `<li><span>Data da última edição:</span> ${convertTimeUnixTime(
            value
          )}</li>`;
          break;

        case "LASTEDITEDUSER":
          message += `<li><span>Usuário da última edição:</span> ${value}</li>`;
          break;

        case "CREATEDUSER":
          message += `<li><span>Usuário que criou:</span> ${value}</li>`;
          break;

        case "CREATEDDATE":
          message += `<li><span>Data que criou:</span> ${convertTimeUnixTime(
            value
          )}</li>`;
          break;

        case "VALORTAXA":
          message += `<li><span>Valor da taxa:</span> ${convertNumberToCurrency(
            value as number
          )}</li>`;
          break;
        case "VALORPAGO":
          message += `<li><span>Valor pago:</span> ${convertNumberToCurrency(
            value as number
          )}</li>`;
          break;
        case "EFFUTZDESC":
          message += `<li><span>Tipo de resíduo descartado:</span> ${value}</li>`;
          break;
        case "RPA":
          message += `<li><span>Região Político-Administrativa:</span> ${value}</li>`;
          break;
        case "TLOTESULAT":
          message += `<li><span>Data da geração:</span> ${value}</li>`;
          break;
        case "VLAREACAD":
          message += `<li><span>Área total no cadastro imobiliário municipal:</span> ${value} m²</li>`;
          break;
        case "VLAREAENGEF":
          message += `<li><span>Área total por registro aéreo :</span> ${value} m²</li>`;
          break;
        case "MAXPAVIME":
          message += `<li><span>Máximo quantidade de pavimentos:</span> ${value}</li>`;
          break;
        case "TESTADAPRINCIPAL":
          message += `<li><span>Face principal do lote:</span> ${value}</li>`;
          break;
        case "QTDMULTIPLAS":
          message += `<li><span>Quantidade de múltiplas(edificação simples) dentro do lote:</span> ${value}</li>`;
          break;
        case "QTDUNHABI":
          message += `<li><span>Quantidade de Unidade Habit/Comercial:</span> ${value}</li>`;
          break;

        default:
          message += `<li><span>${capitalize(key).replaceAll(
            "_",
            " "
          )}:</span> ${
            typeof value === "string" ? capitalize(value) : value
          } </li>`;
          break;
      }
    }
  }

  return message;
}
