import { fetch } from "@services/index";
import { AxiosResponse } from "axios";
import {
  ProjectParams,
  LayerParams,
  LayerPropertiesByLocation,
} from "@services/map/types";

export function apiGetDataGeoJsonProject(
  params: ProjectParams
): Promise<AxiosResponse> {
  return fetch({
    method: "GET",
    path: `projects/${params.projectId}/areas?areaName=${params.areaName}`,
  });
}

export function apiPostLayerGeoJson(
  params: LayerParams
): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "map/layers",
    data: params,
  });
}

export function apiGetPropertiesLayerByLocation(
  params: LayerPropertiesByLocation
): Promise<AxiosResponse> {
  return fetch({
    method: "GET",
    path: `map/layers/${params.layerName}/${params.locationId}/properties`,
  });
}
