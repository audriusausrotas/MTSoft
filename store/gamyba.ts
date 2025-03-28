import type { Production } from "~/data/interfaces";

export const useProductionStore = defineStore("production", {
  state: () => ({
    production: [] as Production[],
  }),

  actions: {
    addAll(data: Production[]) {
      this.production = [...data];
    },

    addOne(data: Production) {
      this.production = this.production.map((item) => (item._id === data._id ? data : item));
    },

    addProduction(data: Production) {
      this.production.push(data);
    },

    deleteProductionOrder(id: string) {
      this.production = this.production.filter((item) => item._id !== id);
    },

    updateOrder(id: string, data: Production) {
      this.production = this.production.map((item) => (item._id === id ? data : item));
    },

    updatePhoto(id: string, photo: string[]) {
      this.production = this.production.map((item) =>
        item._id === id ? { ...item, files: [...photo] } : item
      );
    },

    clearProduction() {
      this.production = [];
    },
  },
});
