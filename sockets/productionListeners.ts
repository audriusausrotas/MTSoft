import { Socket } from "socket.io-client";

export default function productionListeners(socket: Socket) {
  const useProduction = useProductionStore();

  socket.on("deleteProduction", ({ _id }) => {
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
    useProduction.updateMeasurePostone(_id, index, measureIndex, value, option);
  });

  socket.on("updateProductionStatus", ({ _id, status }) => {
    useProduction.updateStatus(_id, status);
  });

  socket.on("updateProductionMeasure", ({ _id, index, measureIndex, value, field, option }) => {
    useProduction.updateMeasure(_id, index, measureIndex, value, field, option);
  });

  socket.on("newProduction", ({ production }) => {
    useProduction.addProduction(production);
    const useProject = useProjectsStore();
    const foundProject = useProject.projects.find((item) => item._id === production._id);
    if (foundProject) useProject.updateProjectField(production._id, "status", "Gaminama");
  });

  socket.on("newProductionBinding", ({ _id, binding }) => {
    useProduction.addNewBinding(_id, binding);
  });

  socket.on("newProductionMeasure", ({ _id, index, newMeasure }) => {
    useProduction.addNewMeasure(_id, index, newMeasure);
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
