import type { Comment, Order, OrderData } from "~/data/interfaces";

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

    updateOrder(_id: string, dataIndex: number, data: OrderData) {
      this.orders = this.orders.map((item) => {
        if (item._id === _id) {
          item.data[dataIndex] = data;
        }
        return item;
      });
    },

    updateOrderNr(_id: string, orderNr: string) {
      this.orders = this.orders.map((item) => {
        if (item._id === _id) item.orderNr = orderNr;
        return item;
      });
    },

    updateOrderFields(_id: string, dataIndex: number, field: keyof OrderData, value: boolean) {
      this.orders = this.orders.map((order) =>
        order._id !== _id
          ? order
          : {
              ...order,
              data: order.data.map((item, index) =>
                index !== dataIndex ? item : { ...item, [field]: value }
              ),
            }
      );
    },

    finishOrder(_id: string) {
      this.orders = this.orders.map((item) => {
        if (item._id === _id) item.status = false;
        return item;
      });
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
            (item) => item.date !== comment.date && item.comment !== comment.comment
          );
          return order;
        } else return order;
      });
    },
  },
});
