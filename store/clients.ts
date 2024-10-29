import type { Client } from "~/data/interfaces";

export const useClientsStore = defineStore("client", {
  state: () => ({
    clients: [] as Client[],
  }),

  actions: {
    async setClients(clients: Client[]) {
      this.clients = [...clients];
    },

    addClient(client: Client) {
      this.clients.push(client);
    },

    updateClient(data: Client) {
      this.clients = this.clients.map((client) => {
        if (client._id === data._id) return data;
        else return client;
      });
    },

    deleteClient(id: string) {
      this.clients = this.clients.filter((client) => client._id !== id);
    },
  },

  getters: {},
});
