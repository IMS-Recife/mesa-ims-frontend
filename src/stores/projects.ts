import { acceptHMRUpdate, defineStore } from "pinia";

import { Project } from "@/@types";

type State = {
  projects: Project[];
  currentProject: any | null;
  projectZones: any[];
};

export const useProjects = defineStore("projects", {
  persist: {
    enabled: true,
  },
  state: (): State => ({
    projects: [],
    currentProject: null,
    projectZones: [],
  }),

  actions: {
    setProjectList(payload: Project) {
      this.projects.push(payload);
    },
    setCurrentProject(payload: Project) {
      this.currentProject = payload;
    },
    setProjectZones(payload: any[]) {
      this.projectZones = payload;
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProjects, import.meta.hot));
