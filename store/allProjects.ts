import { defineStore } from "pinia";

interface Project {
  _id: String;
  client: Record<string, any>;
  fenceMeasures: Array<any>;
  results: Array<any>;
  calculatedParts: Record<string, any>;
}

interface Response {
  success: Boolean;
  data: Project[];
  message: String;
}

interface ProjectsState {
  allProjects: Project[];
}

export const useAllProjectsStore = defineStore("allProjects", {
  state: (): ProjectsState => ({
    allProjects: [],
  }),

  actions: {
    async fetchProjects(): Promise<void> {
      const response: Response = await $fetch("/api/getProjects");
      if (response.success) {
        this.allProjects = [...response.data];
      }
    },
    async deleteProject(id: String) {
      this.allProjects = this.allProjects.filter((item) => item._id !== id);
    },
  },
});
