import { Socket } from "socket.io-client";

export default function productionListeners(socket: Socket) {
  const productionStore = useProductionStore();

  socket.on("deleteProduction", ({ _id }) => {
    productionStore.deleteProductionOrder(_id);
  });

  socket.on("deleteProductionBinding", ({ _id, bindingId }) => {
    productionStore.deleteBinding(_id, bindingId);
  });

  socket.on("deleteProductionFence", ({ _id, index }) => {
    productionStore.deleteFence(_id, index);
  });

  socket.on("deleteProductionMeasure", ({ _id, index, measureIndex }) => {
    productionStore.deleteMeasure(_id, index, measureIndex);
  });

  socket.on(
    "updateProductionPostone",
    ({ _id, index, measureIndex, value, option }) => {
      productionStore.updateMeasure(
        _id,
        index,
        measureIndex,
        value,
        "postone",
        option
      );
    }
  );

  socket.on("updateProductionStatus", ({ _id, status }) => {
    productionStore.updateStatus(_id, status);
  });

  socket.on(
    "updateProductionMeasure",
    ({ _id, index, measureIndex, value, field, option }) => {
      productionStore.updateMeasure(
        _id,
        index,
        measureIndex,
        value,
        field,
        option
      );
    }
  );

  socket.on("newProduction", (production) => {
    productionStore.addProduction(production);
    useProjectsStore().updateProjectField(production._id, "status", "Gaminama");
  });

  socket.on("newProductionBinding", ({ _id, data }) => {
    productionStore.addNewBinding(_id, data);
  });

  socket.on("newProductionMeasure", ({ _id, index, newMeasure }) => {
    productionStore.addNewMeasure(_id, index, newMeasure);
  });

  socket.on("newProductionComment", ({ _id, comment }) => {
    productionStore.addComment(_id, comment);
  });
  socket.on("deleteProductionComment", ({ _id, comment }) => {
    productionStore.deleteComment(_id, comment);
  });

  socket.on("updateProductionFiles", ({ _id, files }) => {
    productionStore.updateFiles(_id, files);
  });
}
