import { Socket } from "socket.io-client";

export default function InstallationListeners(socket: Socket) {
  const useInstallation = useInstallationStore();

  socket.on("newInstallation", (data) => {
    useInstallation.addOne(data);
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
    useInstallation.addComment(_id, comment);
  });
  socket.on("deleteInstallationComment", ({ _id, comment }) => {
    useInstallation.deleteComments(_id, comment);
  });
  socket.on("uploadFilesInstallation", ({ _id, files }) => {
    useInstallation.updatePhoto(_id, files);
  });
  socket.on("deleteFilesInstallation", ({ _id, files }) => {
    useInstallation.updatePhoto(_id, files);
  });
}
