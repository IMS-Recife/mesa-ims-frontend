import { Layer, Buffer, SearchAreas } from "@/@types";

export type ProjectParams = {
  projectId: string;
  areaName: string;
};

export type LayerParams = {
  layers: Layer[];
  buffer: Buffer;
  searchAreas: SearchAreas;
};

export type LayerPropertiesByLocation = {
  layerName: string;
  locationId: string;
};
