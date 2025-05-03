import { Socket } from "socket.io-client";

export default function InstallationListeners(socket: Socket) {
  const installationStore = useInstallationStore();

  socket.on("newInstallation", (data) => {
    installationStore.addInstallation(data);
    useProjectsStore().updateProjectField(data._id, "status", "Montuojama");
  });

  socket.on("deleteInstallationOrder", ({ _id }) => {
    installationStore.deleteInstallationOrder(_id);
  });

  socket.on("deleteInstallationWorker", ({ _id, worker }) => {
    installationStore.deleteInstallationWorker(_id, worker);
  });

  socket.on("updateInstallationPostone", ({ _id, index, measureIndex, value }) => {
    installationStore.updatePostone(_id, index, measureIndex, value);
  });

  socket.on("updateInstallationDone", ({ _id, index, measureIndex, value }) => {
    installationStore.updateDone(_id, index, measureIndex, value);
  });
  socket.on("updateInstallationStatus", ({ _id, status }) => {
    installationStore.updateStatus(_id, status);
  });
  socket.on("newInstallationComment", ({ _id, comment }) => {
    installationStore.addComment(_id, comment);
  });
  socket.on("deleteInstallationComment", ({ _id, comment }) => {
    installationStore.deleteComment(_id, comment);
  });
  socket.on("updateInstallationFiles", ({ _id, files }) => {
    installationStore.updateFiles(_id, files);
  });
}
