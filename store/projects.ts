import { defineStore } from "pinia";
import type { ProjectsState, Project } from "~/data/interfaces";

export const useProjectsStore = defineStore("Projects", {
  state: (): ProjectsState => ({
    projects: [],
    archive: [],
    filteredProjects: [],
    selectedProject: null,
    selectedFilter: "Visi",
  }),

  actions: {
    addProjects(data: any) {
      this.projects = [...data];
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
        this.projects.unshift(project);
      }
      this.filterProjects();
    },
    deleteProject(id: String): void {
      this.projects = this.projects.filter((item) => item._id !== id);
      this.filterProjects();
    },
    deleteArchive(id: String): void {
      this.archive = this.archive.filter((item) => item._id !== id);
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
    moveToArchive(data: Project) {
      this.archive.unshift(data);
      this.deleteProject(data._id);
    },

    moveToProjects(data: Project) {
      this.projects.unshift(data);
      this.deleteArchive(data._id);
    },

    addArchives(data: Project[]) {
      this.archive = [...data];
    },

    changeFilter(data: string) {
      this.selectedFilter = data;
      this.filterProjects();
    },
    filterProjects() {
      if (this.selectedFilter === "Visi")
        this.filteredProjects = [...this.projects];
      else
        this.filteredProjects = this.projects.filter((item) =>
          item.orderNumber.startsWith(this.selectedFilter)
        );
    },
  },
});
