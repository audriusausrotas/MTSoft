import type { Montavimas } from "~/data/interfaces";

export const useMontavimasStore = defineStore("montavimas", {
  state: () => ({
    montavimasList: [] as Montavimas[],
    filteredMontavimasList: [] as Montavimas[],
  }),

  actions: {
    addAll(data: Montavimas[]) {
      this.montavimasList = [...data];
      this.updateFilteredMontavimasList();
    },

    addOne(data: Montavimas) {
      if (this.montavimasList.length === 0) this.montavimasList.push(data);
      else {
        this.montavimasList = this.montavimasList.map((item) => {
          if (item._id === data._id) return data;
          else return item;
        });
      }
      this.updateFilteredMontavimasList();
    },

    addMontavimas(data: Montavimas) {
      this.montavimasList.push(data);
      this.updateFilteredMontavimasList();
    },

    deleteMontavimasOrder(id: string) {
      this.montavimasList = this.montavimasList.filter((item) => item._id !== id);
    },

    deleteMontavimasWorker(id: string, worker: string) {
      this.montavimasList = this.montavimasList.map((montavimas) => {
        if (montavimas._id === id) {
          montavimas.workers = montavimas.workers.filter((item) => item !== worker);
          return montavimas;
        } else return montavimas;
      });
      this.updateFilteredMontavimasList();
    },

    updateOrder(id: string, data: Montavimas) {
      this.montavimasList = this.montavimasList.map((item) => {
        if (item._id === id) return data;
        else return item;
      });
    },

    // addPhoto(id: string, photo: { url: string; id: string }) {
    //   this.montavimasList = this.montavimasList.map((item) => {
    //     if (item._id === id) {
    //       item.files = [...item.files, photo];
    //       return item;
    //     } else return item;
    //   });
    // },

    deletePhoto(id: string, files: string[]) {
      this.montavimasList = this.montavimasList.map((item) => {
        if (item._id === id) {
          item.files = item.files.filter((file: string) => !files.includes(file));
          return item;
        } else return item;
      });
    },

    searchMontavimas(value: string) {
      if (value.length > 2) {
        const foundProjects = this.montavimasList.filter(
          (project) =>
            project.client.address.toLowerCase().includes(value.toLowerCase()) ||
            project.creator.username.toLowerCase().includes(value.toLowerCase()) ||
            project.orderNumber.toLowerCase().includes(value.toLowerCase())
        );

        this.filteredMontavimasList = [...foundProjects];
      } else {
        this.updateFilteredMontavimasList();
      }
    },

    updateFilteredMontavimasList() {
      this.filteredMontavimasList = [...this.montavimasList];
    },
  },
});
