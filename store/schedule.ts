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
      const index = this.schedules.findIndex(
        (item) => item._id === schedule._id
      );
      if (index !== -1) {
        this.schedules[index] = schedule;
      } else {
        this.schedules.push(schedule);
      }
    },

    updateSchedule(schedule: Schedule) {
      const index = this.schedules.findIndex(
        (item) => item._id === schedule._id
      );
      if (index !== -1) {
        this.schedules[index] = schedule;
      }
    },

    deleteSchedule(date: string, worker: Worker) {
      this.schedules = this.schedules.filter((item) => {
        return !(item.date === date && item.worker._id === worker._id);
      });
    },
  },

  getters: {
    getScheduleByWorkerAndDate: (state) => (workerId: string, date: Date) => {
      return state.schedules.find((schedule) => {
        return (
          schedule.worker?._id === workerId &&
          new Date(schedule.date).toDateString() === date.toDateString()
        );
      });
    },
  },
});
