import type { GateSchema } from "~/data/interfaces";

export const useGateStore = defineStore("gate", {
  state: () => ({
    gates: [] as GateSchema[],
  }),

  actions: {
    async getGates(): Promise<void> {
      const { data: gates }: any = await useFetch("/api/gates");
      if (gates.value.success) {
        this.gates = [...gates.value.data];
      }
    },
  },

  getters: {},
});
