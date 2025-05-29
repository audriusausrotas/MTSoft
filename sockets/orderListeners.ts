import { Socket } from "socket.io-client";

export default function orderListeners(socket: Socket) {
  const orderStore = useOrderStore();

  socket.on("deleteOrder", ({ _id }) => {
    orderStore.deleteOrder(_id);
  });

  socket.on("newOrder", (order) => {
    orderStore.newOrder(order);
  });

  socket.on("updateOrder", ({ _id, dataIndex, data }) => {
    orderStore.updateOrder(_id, dataIndex, data);
  });

  socket.on("updateOrderNr", ({ _id, value }) => {
    orderStore.updateOrderNr(_id, value);
  });

  socket.on("updateOrderFields", ({ _id, dataIndex, field, value }) => {
    orderStore.updateOrderFields(_id, dataIndex, field, value);
  });

  socket.on("finishOrder", ({ _id, projectID }) => {
    orderStore.finishOrder(_id);
    const order = orderStore.orders.find((item) => item._id === _id);
    if (order) {
      order.data.forEach((item) => {
        useProjectsStore().partsDelivered(projectID, item.measureIndex, item.delivered);
      });
    }
  });

  socket.on("newOrderComment", ({ _id, comment }) => {
    orderStore.addComment(_id, comment);
  });
  socket.on("deleteOrderComment", ({ _id, comment }) => {
    orderStore.deleteComment(_id, comment);
  });
}
