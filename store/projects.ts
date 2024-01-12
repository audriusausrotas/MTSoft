import { defineStore } from "pinia";
import type { Response, ProjectsState, Project } from "~/data/interfaces";

export const useProjectsStore = defineStore("Projects", {
  state: (): ProjectsState => ({
    projects: [],
  }),

  actions: {
    async fetchProjects(): Promise<void> {
      const response: Response = await $fetch("/api/project");
      if (response.success) {
        this.projects = [...response.data];
      }
    },
    addProject(project: Project): void {
      this.projects.push(project);
    },
    deleteProject(id: String): void {
      this.projects = this.projects.filter((item) => item._id !== id);
    },
  },
});
