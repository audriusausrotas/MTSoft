import type { Result, Works } from "~/data/interfaces";

export const useBackupStore = defineStore("backup", {
  state: () => ({
    results: [] as Result[],
    works: [] as Works[],
    backupExist: false as boolean,
  }),

  actions: {
    addBackup(results: Result[], works: Works[]) {
      this.results = results;
      this.works = works;
      this.backupExist = true;
    },

    clearBackup() {
      this.results = [];
      this.works = [];
      this.backupExist = false;
    },
  },

  getters: {},
});
