import { fetch } from "@services/index";
import { AxiosResponse } from "axios";

type CreateProjectDTO = {
  name: string;
  responsibleOrg: string;
  currentState: string;
  areas?: string[];
  startDate: string;
  location?: string;
  thematicGroups?: string;
  referenceLink?: string;
  phase: string;
  measurementUnit?: string;
  expectedQuantity?: number;
  executedQuantity?: number;
  projectValue?: number;
  infiltrationsSize?: number;
  constructionWorkValue?: number;
  partners?: string;
  completedPercentage?: number;
  relations?: string[];
  plans?: string;
}

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

export function apiPostProject(payload : CreateProjectDTO): Promise<AxiosResponse> {
  return fetch({
    method: "POST",
    path: "projects/",
    data: payload,
  });
}

export function apiGetProjectById(id: string): Promise<AxiosResponse> {
  return fetch({
    method: "GET",
    path: `projects/${id}`,
  });
}

export function apiDeleteProject(id: string): Promise<AxiosResponse> {
  return fetch({
    method: "DELETE",
    path: `projects/${id}`,
  });
}

