import { Socket } from "socket.io-client";

export default function productionListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("deleteProduction", (userId) => {
    // get id
  });

  socket.on("deleteProductionBinding", (userId) => {
    // get { _id, bindingId }
  });

  socket.on("deleteProductionFence", (userId) => {
    // get { _id, index }
  });

  socket.on("deleteProductionMeasure", (userId) => {
    // get { _id, index, measureIndex }
  });

  socket.on("updateProductionPostone", (userId) => {
    // get { _id, index, measureIndex, value, option }
  });

  socket.on("updateProductionStatus", (userId) => {
    // get { _id, status }
  });
  socket.on("updateProductionMeasure", (userId) => {
    // get { _id, index, measureIndex, value, field, option }
  });
  socket.on("newProduction", (userId) => {
    // get { _id, index, measureIndex, value, field, option }
  });
  socket.on("newProductionBinding", (userId) => {
    // get get object and _id
  });
  socket.on("newProductionMeasure", (userId) => {
    // get get object and _id
  });
}
