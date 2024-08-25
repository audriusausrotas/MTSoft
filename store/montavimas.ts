import type { Montavimas } from "~/data/interfaces";

export const useMontavimasStore = defineStore("montavimas", {
  state: () => ({
    montavimasList: [] as Montavimas[],
  }),

  actions: {
    addAll(data: Montavimas[]) {
      this.montavimasList = [...data];
    },

    addMontavimas(data: Montavimas) {
      this.montavimasList.push(data);
    },

    deleteMontavimasOrder(id: string) {
      this.montavimasList = this.montavimasList.filter(
        (item) => item._id !== id
      );
    },

    updateOrder(id: string, data: Montavimas) {
      this.montavimasList = this.montavimasList.map((item) => {
        if (item._id === id) return data;
        else return item;
      });
    },

    changeWorker(id: string, value: string) {
      this.montavimasList = this.montavimasList.map((item) => {
        if (item._id === id) {
          item.worker = value;
          return item;
        } else return item;
      });
    },
  },

  getters: {},
});
