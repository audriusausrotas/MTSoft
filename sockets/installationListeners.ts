import { Socket } from "socket.io-client";

export default function InstallationListeners(socket: Socket) {
  const useInstallation = useInstallationStore();

  socket.on("newInstallation", (data) => {
    useInstallation.addInstallation(data);
    useProjectsStore().updateProjectField(data._id, "status", "Montuojama");
  });

  socket.on("deleteInstallationOrder", ({ _id }) => {
    useInstallation.deleteInstallationOrder(_id);
  });

  socket.on("deleteInstallationWorker", ({ _id, worker }) => {
    useInstallation.deleteInstallationWorker(_id, worker);
  });

  socket.on("installationPartsDelivered", ({ _id, measureIndex, value }) => {
    useInstallation.updatePartsDelivered(_id, measureIndex, value);
  });

  socket.on("updateInstallationPostone", ({ _id, index, measureIndex, value }) => {
    useInstallation.updatePostone(_id, index, measureIndex, value);
  });

  socket.on("updateInstallationDone", ({ _id, index, measureIndex, value }) => {
    useInstallation.updateDone(_id, index, measureIndex, value);
  });
  socket.on("updateInstallationStatus", ({ _id, status }) => {
    useInstallation.updateStatus(_id, status);
  });
  socket.on("newInstallationComment", ({ _id, comment }) => {
    console.log();
    useInstallation.addComment(_id, comment);
  });
  socket.on("deleteInstallationComment", ({ _id, comment }) => {
    useInstallation.deleteComments(_id, comment);
  });
  socket.on("updateInstallationFiles", ({ _id, files }) => {
    useInstallation.updateFiles(_id, files);
  });
}
