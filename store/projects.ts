import { defineStore } from "pinia";
import type { Project, Comment } from "~/data/interfaces";

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
      this.projects.unshift(project);
    },

    updateProject(project: Project): void {
      this.projects = this.projects.map((item) => (item._id === project._id ? project : item));
    },

    addComment(_id: string, comment: Comment): void {
      this.projects = this.projects.map((project) => {
        if (project._id === _id) {
          project.comments = [...project.comments, comment];
          return project;
        } else return project;
      });
    },

    deleteComment(_id: string, comment: Comment) {
      this.projects = this.projects.map((project) => {
        if (project._id === _id) {
          project.comments = project.comments.filter(
            (item) =>
              item.date !== comment.date &&
              item.creator !== comment.creator &&
              item.comment !== comment.comment
          );
          return project;
        } else return project;
      });
    },

    deleteProject(_id: string): void {
      this.projects = this.projects.filter((item) => item._id !== _id);
    },

    setSelectedProject(_id: string) {
      this.selectedProject = _id;
    },

    clearSelected() {
      this.selectedProject = null;
    },

    updateProjectField<T extends keyof Project>(id: string, field: T, value: Project[T]) {
      this.projects = this.projects.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      );
    },

    deleteVersion(versionId: string, projectId: string) {
      this.projects = this.projects.map((item) => {
        if (item._id === projectId) {
          item.versions = item.versions.filter((version) => version._id !== versionId);
          return item;
        } else return item;
      });
    },

    updateFiles(_id: string, files: string[]) {
      this.projects = this.projects.map((item) => {
        if (item._id === _id) {
          item.files = [...files];
          return item;
        } else return item;
      });
    },
  },
});
