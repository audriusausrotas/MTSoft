import type { GateSchema } from "~/data/interfaces";

export const useGateStore = defineStore("gate", {
  state: () => ({
    gates: [] as GateSchema[],
  }),

  actions: {
    addGates(data: GateSchema[]) {
      this.gates = [...data];
    },

    removeGates(id: string) {
      if (this.gates.some((item) => item._id === id)) {
        this.gates = this.gates.filter((item) => item._id !== id);
      }
    },

    addGate(data: GateSchema) {
      this.gates.push(data);
    },

    updateGate(data: GateSchema, id: string) {
      this.gates = this.gates.map((item) => {
        if (item._id === id) return data;
        else return item;
      });
    },
  },

  getters: {},
});
