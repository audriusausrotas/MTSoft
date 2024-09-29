import type { Schedule } from "~/data/interfaces";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedule: [] as Schedule[],
  }),

  actions: {
    addSchedules(schedules: Schedule[]) {
      console.log(schedules);
      this.schedule = schedules;
    },
  },

  getters: {},
});
