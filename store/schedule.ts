import type { Schedule } from "~/data/interfaces";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedule: [] as Schedule[],
  }),

  actions: {
    addSchedules(schedules: Schedule[]) {
      this.schedule = [...schedules];
    },
  },

  getters: {},
});
