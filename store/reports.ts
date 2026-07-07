export const useReportsStore = defineStore("reports", {
  state: () => ({
    reports: [] as any,
  }),

  actions: {
    addReports(data: any) {
      this.reports = data;
    },
  },

  getters: {},
});
