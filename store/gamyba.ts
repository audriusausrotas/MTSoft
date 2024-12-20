import type { Gamyba } from "~/data/interfaces";

export const useGamybaStore = defineStore("gamyba", {
  state: () => ({
    gamybaList: [] as Gamyba[],
    filteredGamybaList: [] as Gamyba[],
  }),

  actions: {
    addAll(data: Gamyba[]) {
      this.gamybaList = [...data];
      this.updateFilteredGamyba();
    },

    addOne(data: Gamyba) {
      if (this.gamybaList.length === 0) this.gamybaList.push(data);
      else {
        this.gamybaList = this.gamybaList.map((item) => {
          if (item._id === data._id) return data;
          else return item;
        });
      }
      this.updateFilteredGamyba();
    },

    addGamyba(data: Gamyba) {
      this.gamybaList.push(data);
      this.updateFilteredGamyba();
    },

    deleteGamybaOrder(id: string) {
      this.gamybaList = this.gamybaList.filter((item) => item._id !== id);
      this.updateFilteredGamyba();
    },

    updateOrder(id: string, data: Gamyba) {
      this.gamybaList = this.gamybaList.map((item) => {
        if (item._id === id) {
          return data;
        } else return item;
      });
    },

    addPhoto(id: string, photo: { url: string; id: string }) {
      this.gamybaList = this.gamybaList.map((item) => {
        if (item._id === id) {
          item.files = [...item.files, photo];
          return item;
        } else return item;
      });
    },

    deletePhoto(id: string, photoID: string) {
      this.gamybaList = this.gamybaList.map((item) => {
        if (item._id === id) {
          item.files = item.files.filter((item) => item.id !== photoID);
          return item;
        } else return item;
      });
    },

    clearGamyba() {
      this.gamybaList = [];
      this.filteredGamybaList = [];
    },

    searchGamyba(value: string) {
      if (value.length > 2) {
        const foundProjects = this.gamybaList.filter(
          (project) =>
            project.client.address
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            project.creator.username
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            project.orderNumber.toLowerCase().includes(value.toLowerCase())
        );

        this.filteredGamybaList = [...foundProjects];
      } else {
        this.filteredGamybaList = [...this.gamybaList];
      }
    },

    updateFilteredGamyba() {
      this.filteredGamybaList = [...this.gamybaList];
    },
  },
});
