import type { Comment, Order } from "~/data/interfaces";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as Order[],
  }),

  actions: {
    addOrders(orders: [Order]) {
      this.orders = [...orders];
    },

    newOrder(order: Order) {
      this.orders.push(order);
    },

    updateOrder(order: Order) {
      this.orders = this.orders.map((item) =>
        item._id === order._id ? order : item
      );
    },

    deleteOrder(_id: string) {
      this.orders = this.orders.filter((item) => item._id !== _id);
    },

    addComment(_id: string, comment: Comment): void {
      this.orders = this.orders.map((order) => {
        if (order._id === _id) {
          order.comments = [...order.comments, comment];
          return order;
        } else return order;
      });
    },

    deleteComment(_id: string, comment: Comment) {
      this.orders = this.orders.map((order) => {
        if (order._id === _id) {
          order.comments = order.comments.filter(
            (item) =>
              item.date !== comment.date && item.comment !== comment.comment
          );
          return order;
        } else return order;
      });
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
