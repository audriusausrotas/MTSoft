import { defineStore } from "pinia";
import type { Response, ProjectsState, Project } from "~/data/interfaces";

export const useProjectsStore = defineStore("Projects", {
  state: (): ProjectsState => ({
    projects: [],
    selectedProject: null,
  }),

  actions: {
    async fetchProjects(): Promise<void> {
      const response: Response = await $fetch("/api/project");
      if (response.success) {
        this.projects = [...response.data];
      }
    },
    addProject(project: Project): void {
      let projectExist = false;
      this.projects = this.projects.map((item) => {
        if (item._id === project._id) {
          projectExist = true;
          return project;
        } else {
          return item;
        }
      });
      if (!projectExist) {
        this.projects.push(project);
      }
    },
    deleteProject(id: String): void {
      this.projects = this.projects.filter((item) => item._id !== id);
    },
    setSelectedProject(data: string) {
      this.selectedProject = data;
    },
    clearSelected() {
      this.selectedProject = null;
    },
    updateStatus(project: Project) {
      this.projects = this.projects.map((item) => {
        if (item._id === project._id) return project;
        else return item;
      });
    },
  },
});
