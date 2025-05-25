import { defineStore } from "pinia";
import { version } from "vue";
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
            (item) => item.date !== comment.date && item.comment !== comment.comment
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

    updateProjectDates<T extends keyof Dates>(id: string, field: T, value: Dates[T]) {
      this.projects = this.projects.map((item) =>
        item._id === id
          ? {
              ...item,
              dates: { ...item.dates, [field]: value },
            }
          : item
      );
    },

    deleteVersion(versionId: string, projectId: string) {
      this.projects = this.projects.map((item) => {
        if (item._id === projectId) {
          item.versions = item.versions.filter(
            (version) => version.id?.toString() !== versionId.toString()
          );
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

    partsDelivered(_id: string, measureIndex: number, value: boolean) {
      this.projects = this.projects.map((item) => {
        if (item._id === _id) {
          item.results[measureIndex].delivered = value;
          return item;
        } else return item;
      });
    },

    partsOrdered(_id: string, measureIndex: number, value: boolean) {
      this.projects = this.projects.map((item) => {
        if (item._id === _id) {
          item.results[measureIndex].ordered = value;
          return item;
        } else return item;
      });
    },

    workDone(_id: string, measureIndex: number, value: boolean) {
      this.projects = this.projects.map((item) => {
        if (item._id === _id) {
          item.works[measureIndex].done = value;
          return item;
        } else return item;
      });
    },

    changeCompletionDate(_id: string, date: string) {
      this.projects = this.projects.map((item) => {
        if (item._id === _id) {
          item.dates.dateCompletion = date;
          return item;
        } else return item;
      });
    },
  },

  getters: {
    getConfirmed: (state) => {
      return state.projects.filter(
        (project) =>
          project.status !== "Nepatvirtintas" &&
          project.status !== "Tinkamas" &&
          project.status !== "Netinkamas" &&
          project.status !== "Baigtas" &&
          project.status !== "Pridavimas" &&
          project.status !== "Apmokėjimas"
      );
    },

    searchGetConfirmed: (state) => {
      return (value: string) => {
        return useProjectsStore().getConfirmed.filter(
          (project: Project) =>
            project.client.address.toLowerCase().includes(value.toLowerCase()) ||
            project.client.email.toLowerCase().includes(value.toLowerCase()) ||
            project.client.phone.toLowerCase().includes(value.toLowerCase()) ||
            project.client.username.toLowerCase().includes(value.toLowerCase()) ||
            project.orderNumber.toLowerCase().includes(value.toLowerCase())
        );
      };
    },
  },
});
