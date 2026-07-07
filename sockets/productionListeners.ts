import { Socket } from "socket.io-client";

export default function productionListeners(socket: Socket) {
  const productionStore = useProductionStore();

  socket.on("deleteProduction", ({ _id }) => {
    productionStore.deleteProductionOrder(_id);
  });

  socket.on("deleteProductionBinding", ({ _id, bindingId }) => {
    productionStore.deleteBinding(_id, bindingId);
  });

  socket.on("deleteProductionFence", ({ _id, fenceId }) => {
    productionStore.deleteFence(_id, fenceId);
  });

  socket.on("deleteProductionMeasure", ({ _id, index, measureIndex }) => {
    productionStore.deleteMeasure(_id, index, measureIndex);
  });

  socket.on("updateProductionPostone", ({ _id, index, measureIndex, value, option }) => {
    productionStore.updateMeasure(_id, index, measureIndex, value, "postone", option);
  });

  socket.on("updateProductionStatus", ({ _id, status }) => {
    productionStore.updateStatus(_id, status);
  });

  socket.on("updateProductionMeasure", ({ _id, index, measureIndex, value, field, option }) => {
    productionStore.updateMeasure(_id, index, measureIndex, value, field, option);
  });

  socket.on("updateProductionGate", ({ _id, index, measureIndex, value }) => {
    productionStore.updateGate(_id, index, measureIndex, value);
  });

  socket.on("updateProductionHoles", ({ _id, index, value }) => {
    productionStore.updateHoles(_id, index, value);
  });

  socket.on(
    "updateProductionFence",
    ({ _id, index, side, color, name, manufacturer, material, holes, step }) => {
      productionStore.updateFence(
        _id,
        index,
        side,
        color,
        name,
        manufacturer,
        material,
        holes,
        step,
      );
    },
  );

  socket.on("newProduction", (production) => {
    productionStore.addProduction(production);
    useProjectsStore().updateProjectField(production._id, "status", "Gaminama");
  });

  socket.on("newExternalProduction", (production) => {
    productionStore.addProduction(production);
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

  socket.on("aditionalOrderedProduction", ({ projectOrderNr, message, data }) => {
    productionStore.aditionalOrderedProduction(projectOrderNr, message, data);
  });

  socket.on("updateFenceFiles", ({ _id, id, files }) => {
    productionStore.updateFenceFiles(_id, id, files);
  });
  socket.on("updateBindingFiles", ({ _id, id, files }) => {
    productionStore.updateBindingFiles(_id, id, files);
  });
}
