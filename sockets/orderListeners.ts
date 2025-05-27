import { Socket } from "socket.io-client";

export default function orderListeners(socket: Socket) {
  const orderStore = useOrderStore();

  socket.on("deleteOrder", ({ _id }) => {
    orderStore.deleteOrder(_id);
  });

  socket.on("newOrder", (order) => {
    orderStore.newOrder(order);
  });

  socket.on("updateOrder", (order) => {
    orderStore.updateOrder(order);
  });
}
