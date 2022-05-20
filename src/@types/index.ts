import { ViteSSGContext } from "vite-ssg";

export type ViteModule = (ctx: ViteSSGContext) => void;

declare global {
  interface Window {
    FB: any;
    gapi: any;
  }
}

export type User = {
  _id: string;
  email: string;
  name: string;
  role: Array<string>;
};

export type Token = {
  accessToken: string;
  iat: number;
  exp: number;
};

export type LatLng = [number, number];

export type SetView = {
  center: LatLng;
  zoom: number;
};

export type PanTo = {
  latlng: LatLng;
};

export type TileLayer = {
  accessToken: string;
  id: string;
  maxZoom: number;
  minZoom: number;
  attribution: string;
};

export type BaseMap = {
  center: LatLng;
  zoom: number;
  zoomControl?: boolean;
  attributionControl: boolean;
};

export type Marker = {
  lat: number;
  lng: number;
  title: string;
  icon: any;
  className?: string;
};

export type Tools = {
  isActiveMarkerMap: boolean;
  isClearMap: boolean;
};

export type Geometry = {
  type: string;
  coordinates: number[];
};

export type StyleGeoJson = {
  stroke: boolean;
  color: string;
  opacity: number;
  fill: boolean;
  fillColor: string;
  fillOpacity: number;
  className: string;
};

export type Zones = {
  _id: string;
  name: string;
  locations: GeoJson[];
};

export type CurrentCoordinatesZone = {
  id?: string;
  coordinates: LatLng;
  type: string;
};

export type GeoJson = {
  _id?: string;
  type: string;
  geometry: Geometry;
  properties: any;
};

export type GeoJsonOptions = {
  pointToLayer?: LatLng;
  style?: StyleGeoJson;
  coordsToLatLng?: LatLng;
};

export type BreadcrumbRoute = {
  path: string;
  name: string;
  currentPath: boolean;
  icon?: string;
};

export type Layer = {
  name: string;
  filter?: object;
};

export type LayersCategory = {
  name: string;
  layers: Layer[];
}[];

export type Buffer = number;

export type SearchAreas = GeoJson[];

// export type InfoProject = {
//   location: string;
//   responsibleOrg: string;
//   relatedOrg: string[];
//   tematicGroup: string[];
//   lastUpdate: Date;
// };


// TODO - fix area types
// export type Location = {
//   type: string
//   properties: Record<string, any>
//   geometry: Geometry
// }

// export type area = {
//   name: string;
//   locations: Location[]; 
// }

export type Project = {
  _id: string;
  name: string;
  created_at: Date;
  info?: any;
  areas?: string[];
  responsibleOrg?: string;
  location?: string;
  partners?: string[];
  thematicGroups?: string[];
  lastUpdate?: Date;
};
