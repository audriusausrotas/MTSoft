import { defineStore } from "pinia";
import type { Project } from "~/data/interfaces";

export const useArchivesStore = defineStore("Archives", {
  state: () => ({
    data: {
      archive: [] as Project[],
      unconfirmed: [] as Project[],
      deleted: [] as Project[],
      backup: [] as Project[],
    },
  }),

  actions: {
    addArchives(location: keyof typeof this.data, projects: Project[]) {
      if (this.data[location]) {
        this.data[location] = projects;
      }
    },

    deleteArchive(_id: string, location: keyof typeof this.data) {
      if (!this.data[location]) return;

      this.data[location] = this.data[location].filter(
        (item) => item._id !== _id
      );
    },

    addArchive(location: keyof typeof this.data, project: Project) {
      if (!this.data[location]) return;

      this.data[location].unshift(project);
    },

    searchArchive(location: keyof typeof this.data, input: string): Project[] {
      if (!this.data[location]) return [];

      if (input.length > 2) {
        return this.data[location].filter((project: Project) =>
          this.matchSearch(project, input)
        );
      }
      return this.data[location];
    },

    matchSearch(project: Project, input: string) {
      const searchFields = [
        project.client?.address,
        project.client?.email,
        project.client?.phone,
        project.client?.username,
        project.orderNumber,
      ];

      return searchFields.some(
        (field) => field && field.toLowerCase().includes(input.toLowerCase())
      );
    },
  },
});
