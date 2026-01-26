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
      this.gates = this.gates.filter((item) => item._id !== id);
    },

    addGate(data: GateSchema) {
      this.gates.push(data);
    },

    updateGate(data: GateSchema) {
      this.gates = this.gates.map((item) => (item._id === data._id ? { ...data } : item));
    },

    updateGateStatus(_id: string, status: string) {
      this.gates = this.gates.map((item) => (item._id === _id ? { ...item, status } : item));
    },
  },

  getters: {
    searchGates: (state) => {
      return (value: string) => {
        const userStore = useUserStore();

        let filteredGates = state.gates;

        if (value.length > 2) {
          filteredGates = filteredGates.filter(
            (item) =>
              item.client.address.toLowerCase().includes(value.toLowerCase()) ||
              item.manager.toLowerCase().includes(value.toLowerCase()) ||
              item.orderNr.toLowerCase().includes(value.toLowerCase()),
          );
        }

        if (
          userStore.user?.accountType !== "Administratorius" &&
          userStore.user?.accountType !== "Vadybininkas"
        ) {
          filteredGates = filteredGates.filter((item) => item.manager === userStore.user?.email);
        }

        return filteredGates;
      };
    },
  },
});
