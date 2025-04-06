import type { Schedule, Worker } from "~/data/interfaces";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedules: [] as Schedule[],
  }),

  actions: {
    addSchedules(schedules: Schedule[]) {
      this.schedules = [...schedules];
    },

    addSchedule(schedule: Schedule) {
      this.schedules = this.schedules.map((item) => (item._id === schedule._id ? schedule : item));
    },

    updateSchedule(schedule: Schedule) {
      this.schedules = this.schedules.map((item) => (item._id === schedule._id ? schedule : item));
    },

    deleteSchedule(date: string, worker: Worker) {
      this.schedules = this.schedules.map((item) => {
        if (item.date === date && item.worker._id === worker._id) {
          item.jobs = [];
          return item;
        } else return item;
      });
    },
  },

  getters: {},
});
