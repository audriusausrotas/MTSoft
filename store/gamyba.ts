import type { Gamyba } from "~/data/interfaces";

export const useGamybaStore = defineStore("gamyba", {
  state: () => ({
    gamybaList: [] as Gamyba[],
  }),

  actions: {
    addAll(data: Gamyba[]) {
      this.gamybaList = [...data];
    },

    addOne(data: Gamyba) {
      this.gamybaList = this.gamybaList.map((item) =>
        item._id === data._id ? data : item
      );
    },

    addGamyba(data: Gamyba) {
      this.gamybaList.push(data);
    },

    deleteGamybaOrder(id: string) {
      this.gamybaList = this.gamybaList.filter((item) => item._id !== id);
    },

    updateOrder(id: string, data: Gamyba) {
      this.gamybaList = this.gamybaList.map((item) =>
        item._id === id ? data : item
      );
    },

    updatePhoto(id: string, photo: string[]) {
      this.gamybaList = this.gamybaList.map((item) =>
        item._id === id ? { ...item, files: [...photo] } : item
      );
    },

    clearGamyba() {
      this.gamybaList = [];
    },
  },
});
