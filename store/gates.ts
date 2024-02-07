import type { GateSchema } from "~/data/interfaces";

export const useGateStore = defineStore("gate", {
  state: () => ({
    gates: [] as GateSchema[],
  }),

  actions: {
    async getGates(): Promise<void> {
      const response: any = await $fetch("/api/gates");
      const { data } = response;
      this.gates = [...data];
    },
  },

  getters: {},
});
