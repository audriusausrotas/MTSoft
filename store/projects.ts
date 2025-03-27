import { defineStore } from "pinia";
import type { Creator, Project, User } from "~/data/interfaces";

export const useProjectsStore = defineStore("Projects", {
  state: () => ({
    projects: [] as Project[],
    selectedProject: null as string | null,
  }),

  actions: {
    addProjects(data: any) {
      this.projects = [...data];
    },

    addProject(project: Project): void {
      this.projects = this.projects.map((item) => {
        if (item._id === project._id) {
          return project;
        } else {
          return item;
        }
      });
    },

    copyProject(project: Project): void {
      this.projects.unshift(project);
    },

    deleteProject(_id: string): void {
      this.projects = this.projects.filter((item) => item._id !== _id);
    },

    setSelectedProject(data: string) {
      this.selectedProject = data;
    },

    clearSelected() {
      this.selectedProject = null;
    },

    // updateStatus(id: string, status: string) {
    //   this.projects = this.projects.map((item) =>
    //     item._id === id ? { ...item, status } : item
    //   );
    // },

    // updateManager(id: string, creator: Creator) {
    //   this.projects = this.projects.map((item) =>
    //     item._id === id ? { ...item, creator } : item
    //   );
    // },

    // updateAdvance(id: string, advance: number) {
    //   this.projects = this.projects.map((item) =>
    //     item._id === id ? { ...item, advance } : item
    //   );
    // },

    // updateExparation(id: string, dateExparation: string) {
    //   this.projects = this.projects.map((item) =>
    //     item._id === id ? { ...item, dateExparation } : item
    //   );
    // },

    updateProjectField<T extends keyof Project>(
      id: string,
      field: T,
      value: Project[T]
    ) {
      this.projects = this.projects.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      );
    },

    deleteVersion(versionId: string, projectId: string) {
      this.projects = this.projects.map((item) => {
        if (item._id === projectId) {
          item.versions = item.versions.filter(
            (version) => version._id !== versionId
          );
          return item;
        } else return item;
      });
    },

    updatePhoto(id: string, photo: string[]) {
      this.projects = this.projects.map((item) => {
        if (item._id === id) {
          item.files = [...photo];
          return item;
        } else return item;
      });
    },
  },
});
