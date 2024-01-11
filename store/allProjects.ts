import { defineStore } from "pinia";
import type { Response, ProjectsState } from "~/data/interfaces";

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
    addProject() {},
    async deleteProject(id: String) {
      this.allProjects = this.allProjects.filter((item) => item._id !== id);
    },
  },
});
