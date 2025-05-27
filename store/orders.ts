import type { Order } from "~/data/interfaces";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as Order[],
  }),

  actions: {
    addOrders(orders: [Order]) {
      this.orders = [...orders];
    },
  },

  getters: {
    // searchGates: (state) => {
    //   return (value: string) => {
    //     const userStore = useUserStore();
    //     let filteredGates = state.gates;
    //     if (value.length > 2) {
    //       filteredGates = filteredGates.filter(
    //         (item) =>
    //           item.client.address.toLowerCase().includes(value.toLowerCase()) ||
    //           item.manager.toLowerCase().includes(value.toLowerCase()) ||
    //           item.orderNr.toLowerCase().includes(value.toLowerCase())
    //       );
    //     }
    //     if (userStore.user?.accountType !== "Administratorius") {
    //       filteredGates = filteredGates.filter((item) => item.manager === userStore.user?.email);
    //     }
    //     return filteredGates;
    //   };
    // },
  },
});
