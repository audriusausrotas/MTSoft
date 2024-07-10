import type { Gamyba } from "~/data/interfaces";

export const useGamybaStore = defineStore("gamyba", {
  state: () => ({
    gamybaList: [] as Gamyba[],
  }),

  actions: {
    addAll(data: Gamyba[]) {
      this.gamybaList = [...data];
    },

    addGamyba(data: Gamyba) {
      this.gamybaList.push(data);
    },

    deleteGamybaOrder(id: string) {
      this.gamybaList = this.gamybaList.filter((item) => item._id !== id);
    },

    updateOrder(id: string, data: Gamyba) {
      this.gamybaList = this.gamybaList.map((item) => {
        if (item._id === id) return data;
        else return item;
      });
    },
  },

  getters: {},
});
