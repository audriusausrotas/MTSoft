import { Socket } from "socket.io-client";

export default function productionListeners(socket: Socket) {
  const useProduction = useProductionStore();

  socket.on("deleteProduction", ({ _id }) => {
    console.log(_id);
    useProduction.deleteProductionOrder(_id);
  });

  socket.on("deleteProductionBinding", ({ _id, bindingId }) => {
    useProduction.deleteBinding(_id, bindingId);
  });

  socket.on("deleteProductionFence", ({ _id, index }) => {
    useProduction.deleteFence(_id, index);
  });

  socket.on("deleteProductionMeasure", ({ _id, index, measureIndex }) => {
    useProduction.deleteMeasure(_id, index, measureIndex);
  });

  socket.on("updateProductionPostone", ({ _id, index, measureIndex, value, option }) => {
    useProduction.updateMeasure(_id, index, measureIndex, value, "postone", option);
  });

  socket.on("updateProductionStatus", ({ _id, status }) => {
    useProduction.updateStatus(_id, status);
  });

  socket.on("updateProductionMeasure", ({ _id, index, measureIndex, value, field, option }) => {
    useProduction.updateMeasure(_id, index, measureIndex, value, field, option);
  });

  socket.on("newProduction", (production) => {
    useProduction.addProduction(production);
    useProjectsStore().updateProjectField(production._id, "status", "Gaminama");
  });

  socket.on("newProductionBinding", ({ _id, data }) => {
    useProduction.addNewBinding(_id, data);
  });

  socket.on("newProductionMeasure", ({ _id, index, newMeasure }) => {
    useProduction.addNewMeasure(_id, index, newMeasure);
  });

  socket.on("newProductionComment", ({ _id, comment }) => {
    useProduction.addComment(_id, comment);
  });
  socket.on("deleteProductionComment", ({ _id, comment }) => {
    useProduction.deleteComment(_id, comment);
  });

  socket.on("uploadFilesProduction", ({ _id, files }) => {
    useProduction.updateFiles(_id, files);
  });

  socket.on("deleteFilesProduction", ({ _id, files }) => {
    useProduction.updateFiles(_id, files);
  });
}
