import { fetch } from "@services/index";
import { AxiosResponse } from "axios";

export function apiGetListProjects(): Promise<AxiosResponse> {
  return fetch({
    method: "GET",
    path: "projects/",
  });
}

export function apiGetProjectForName(name: string): Promise<AxiosResponse> {
  return fetch({
    method: "GET",
    path: "projects/",
    params: {
      name: name,
    },
  });
}
