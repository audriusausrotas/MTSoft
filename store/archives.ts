import { defineStore } from "pinia";
import type { ArchivesState, Project } from "~/data/interfaces";

export const useArchivesStore = defineStore("Archives", {
  state: (): ArchivesState => ({
    archives: [],
    filteredArchives: [],
    backup: [],
    filteredBackup: [],
    deleted: [],
    filteredDeleted: [],
    unconfirmed: [],
    filteredUnconfirmed: [],
    projectToOpen: null,
  }),

  actions: {
    addArchives(data: Project[]) {
      this.archives = [...data];
      this.filteredArchives = [...data];
    },

    addBackup(data: Project[]) {
      this.backup = [...data];
      this.filteredBackup = [...data];
    },

    addDeleted(data: Project[]) {
      this.deleted = [...data];
      this.filteredDeleted = [...data];
    },

    addUnconfirmed(data: Project[]) {
      this.unconfirmed = [...data];
      this.filteredUnconfirmed = [...data];
    },

    addProjectToOpen(data: Project) {
      this.projectToOpen = data;
    },

    deleteProjectToOpen() {
      this.projectToOpen = null;
    },

    deleteArchive(id: String, location: string): void {
      if (location === "archive") {
        this.archives = this.archives.filter((item) => item._id !== id);
        this.filteredArchives = this.archives.filter((item) => item._id !== id);
      } else if (location === "unconfirmed") {
        this.filteredUnconfirmed = this.unconfirmed.filter(
          (item) => item._id !== id
        );
        this.unconfirmed = this.unconfirmed.filter((item) => item._id !== id);
      } else if (location === "deleted") {
        this.filteredDeleted = this.deleted.filter((item) => item._id !== id);
        this.deleted = this.deleted.filter((item) => item._id !== id);
      } else if (location === "backup") {
        this.filteredBackup = this.backup.filter((item) => item._id !== id);
        this.backup = this.backup.filter((item) => item._id !== id);
      }
    },

    addArchive(data: Project) {
      if (this.archives.length === 0) this.archives.unshift(data);
      else
        this.archives = this.archives.map((item) => {
          if (item._id === data._id) return data;
          else return item;
        });
    },

    searchArchive(input: string, location: string) {
      if (location === "archive") {
        if (input.length > 2)
          this.filteredArchives = this.search(this.filteredArchives, input);
        else this.filteredArchives = [...this.archives];
      } else if (location === "unconfirmed") {
        if (input.length > 2)
          this.filteredUnconfirmed = this.search(
            this.filteredUnconfirmed,
            input
          );
        else this.filteredUnconfirmed = [...this.unconfirmed];
      } else if (location === "deleted") {
        if (input.length > 2)
          this.filteredDeleted = this.search(this.filteredDeleted, input);
        else this.filteredDeleted = [...this.deleted];
      } else if (location === "backup") {
        if (input.length > 2)
          this.filteredBackup = this.search(this.filteredBackup, input);
        else this.filteredBackup = [...this.backup];
      }
    },

    search(data: Project[], input: string) {
      return data.filter(
        (data: Project) =>
          data.client.address.toLowerCase().includes(input.toLowerCase()) ||
          data.client.email.toLowerCase().includes(input.toLowerCase()) ||
          data.client.phone.toLowerCase().includes(input.toLowerCase()) ||
          data.client.username.toLowerCase().includes(input.toLowerCase()) ||
          data.orderNumber.toLowerCase().includes(input.toLowerCase())
      );
    },
  },
});
