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
    // get get newMeasure, index and _id
  });
  socket.on("newProduction", (userId) => {
    // get get object
    // need to change status in project to Gaminama  in store with http response
  });

  socket.on("newProductionComment", () => {
    // get id and comment
  });
  socket.on("deleteProductionComment", () => {
    // get get id and comment
  });

  socket.on("uploadFilesProduction", () => {
    //  get _id and files as an array with links need to replace in store
  });
  socket.on("deleteFilesProduction", () => {
    // get _id and files as an array with links need to replace in store
  });
}
