import { apiGetListProjects, apiGetProjectForName } from "@services/projects";
// import { useUIStore } from "@stores/ui";
import { useProjects } from "@stores/projects";

export async function getListProjects() {
  const projectStore = useProjects();
  // const ui = useUIStore();
  apiGetListProjects()
    .then((response) => {
      response.data.forEach((element: any) => {
        projectStore.setProjectList(element);
        return;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getProjectForName(name: string) {
  const projectStore = useProjects();
  apiGetProjectForName(name)
    .then((response) => {
      projectStore.setCurrentProject(response.data.find((element: any) => element.name === "Parque Capibaribe"));
    })
    .catch((error) => {
      console.log(error);
    });
}
