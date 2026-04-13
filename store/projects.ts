import { defineStore } from "pinia";
import type { Project, Comment, Dates } from "~/data/interfaces";

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
      const existing = this.projects.find((p) => p._id === project._id);
      if (existing) Object.assign(existing, project);
    },

    addComment(_id: string, comment: Comment): void {
      const project = this.projects.find((p) => p._id === _id);
      if (project) project.comments.unshift(comment);
    },

    deleteComment(_id: string, comment: Comment) {
      const project = this.projects.find((p) => p._id === _id);
      if (project) {
        project.comments = project.comments.filter(
          (item) => item.date !== comment.date && item.comment !== comment.comment,
        );
      }
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
      const project = this.projects.find((p) => p._id === id);
      if (project) project[field] = value;
    },

    updateProjectDates<T extends keyof Dates>(id: string, field: T, value: Dates[T]) {
      const project = this.projects.find((p) => p._id === id);
      if (project) project.dates[field] = value;
    },

    deleteVersion(versionId: string, projectId: string) {
      const project = this.projects.find((p) => p._id === projectId);
      if (project) {
        project.versions = project.versions.filter(
          (version) => version.id?.toString() !== versionId.toString(),
        );
      }
    },

    updateFiles(_id: string, files: string[]) {
      const project = this.projects.find((p) => p._id === _id);
      if (project) project.files = [...files];
    },

    partsDelivered(_id: string, measureIndex: number, value: boolean) {
      const project = this.projects.find((p) => p._id === _id);
      if (project) project.results[measureIndex].delivered = value;
    },

    partsOrdered(_id: string, measureIndex: number, value: boolean) {
      const project = this.projects.find((p) => p._id === _id);
      if (project) project.results[measureIndex].ordered = value;
    },

    workDone(_id: string, measureIndex: number, value: boolean) {
      const project = this.projects.find((p) => p._id === _id);
      if (project) project.works[measureIndex].done = value;
    },

    changeCompletionDate(_id: string, date: string) {
      const project = this.projects.find((p) => p._id === _id);
      if (project) project.dates.dateCompletion = date;
    },
  },

  getters: {
    getConfirmed: (state) => {
      return state.projects.filter(
        (project) =>
          project.status !== "Nepatvirtintas" &&
          project.status !== "Tinkamas" &&
          project.status !== "Netinkamas" &&
          project.status !== "Apmokėjimas",
      );
    },

    searchGetConfirmed: (state) => {
      return (value: string) => {
        const v = value.toLowerCase();
        return useProjectsStore().getConfirmed.filter(
          (project: Project) =>
            project.client.address.toLowerCase().includes(v) ||
            project.client.email.toLowerCase().includes(v) ||
            project.client.phone.toLowerCase().includes(v) ||
            project.client.username.toLowerCase().includes(v) ||
            project.orderNumber.toLowerCase().includes(v),
        );
      };
    },
  },
});
