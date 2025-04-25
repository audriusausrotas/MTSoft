import type { PotentialClient } from "~/data/interfaces";

export const usePotentialClientsStore = defineStore("potentialClients", {
  state: () => ({
    potentialClients: [] as PotentialClient[],
  }),

  actions: {
    addPotentialClients(data: PotentialClient[]) {
      this.potentialClients = [...data];
    },

    addPotentialClient(data: PotentialClient) {
      this.potentialClients.push(data);
    },

    updatePotentialClients(data: PotentialClient) {
      this.potentialClients = this.potentialClients.map((client) =>
        client._id === data._id ? data : client
      );
    },

    deletePotentialClient(id: string) {
      this.potentialClients = this.potentialClients.filter((client) => client._id !== id);
    },

    selectPotentialClients(value: boolean) {
      this.potentialClients = this.potentialClients.map((client) => {
        client.send = value;
        return client;
      });
    },

    selectPotentialClient(_id: string, send: boolean) {
      this.potentialClients = this.potentialClients.map((client) =>
        client._id === _id ? { ...client, send } : client
      );
    },
  },
});
