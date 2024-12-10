import type { Montavimas } from "~/data/interfaces";

export const useMontavimasStore = defineStore("montavimas", {
  state: () => ({
    montavimasList: [] as Montavimas[],
  }),

  actions: {
    addAll(data: Montavimas[]) {
      this.montavimasList = [...data];
    },

    addOne(data: Montavimas) {
      if (this.montavimasList.length === 0) this.montavimasList.push(data);
      else {
        this.montavimasList = this.montavimasList.map((item) => {
          if (item._id === data._id) return data;
          else return item;
        });
      }
    },

    addMontavimas(data: Montavimas) {
      this.montavimasList.push(data);
    },

    deleteMontavimasOrder(id: string) {
      this.montavimasList = this.montavimasList.filter(
        (item) => item._id !== id
      );
    },

    deleteMontavimasWorker(id: string, worker: string) {
      this.montavimasList = this.montavimasList.map((montavimas) => {
        if (montavimas._id === id) {
          montavimas.workers = montavimas.workers.filter(
            (item) => item !== worker
          );
          return montavimas;
        } else return montavimas;
      });
    },

    updateOrder(id: string, data: Montavimas) {
      this.montavimasList = this.montavimasList.map((item) => {
        if (item._id === id) return data;
        else return item;
      });
    },
    addPhoto(id: string, photo: { url: string; id: string }) {
      this.montavimasList = this.montavimasList.map((item) => {
        if (item._id === id) {
          item.files = [...item.files, photo];
          return item;
        } else return item;
      });
    },

    deletePhoto(id: string, photoID: string) {
      this.montavimasList = this.montavimasList.map((item) => {
        if (item._id === id) {
          item.files = item.files.filter((item) => item.id !== photoID);
          return item;
        } else return item;
      });
    },
  },

  getters: {},
});
