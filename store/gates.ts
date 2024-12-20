import type { GateSchema } from "~/data/interfaces";

export const useGateStore = defineStore("gate", {
  state: () => ({
    gates: [] as GateSchema[],
    filteredGates: [] as GateSchema[],
  }),

  actions: {
    addGates(data: GateSchema[]) {
      this.gates = [...data];
      this.updateFilteredGates();
    },

    removeGates(id: string) {
      if (this.gates.some((item) => item._id === id)) {
        this.gates = this.gates.filter((item) => item._id !== id);
      }
      this.updateFilteredGates();
    },

    addGate(data: GateSchema) {
      this.gates.push(data);
      this.updateFilteredGates();
    },

    addSelectedGate(data: GateSchema) {
      this.gates = [];
      this.gates.push(data);
    },

    updateGate(data: GateSchema, id: string) {
      this.gates = this.gates.map((item) => {
        if (item._id === id) return data;
        else return item;
      });
    },

    searchGates(value: string) {
      if (value.length > 2) {
        const foundProjects = this.filteredGates.filter(
          (project) =>
            project.client.address
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            project.manager.toLowerCase().includes(value.toLowerCase()) ||
            project.orderNr.toLowerCase().includes(value.toLowerCase())
        );

        this.filteredGates = [...foundProjects];
      } else {
        this.updateFilteredGates();
      }
    },

    updateFilteredGates() {
      this.filteredGates = [...this.gates];
    },
  },

  getters: {},
});
