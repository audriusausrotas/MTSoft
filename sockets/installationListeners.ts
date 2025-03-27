import { Socket } from "socket.io-client";

export default function InstallationListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("newInstallation", () => {
    // get data
  });

  socket.on("deleteInstallationOrder", () => {
    // get id
  });

  socket.on("deleteInstallationWorker", (userId) => {
    // get id and worker
  });

  socket.on("installationPartsDelivered", (userId) => {
    // get  _id, measureIndex, value
  });

  socket.on("updateInstallationPostone", (userId) => {
    // get { _id, index, measureIndex, value }
  });

  socket.on("updateInstallationDone", (userId) => {
    // get { _id, index, measureIndex, value }
  });
  socket.on("updateInstallationStatus", (userId) => {
    // get { _id, status }
  });
  socket.on("newInstallationComment", (userId) => {
    // get{ _id, comment }
  });
  socket.on("deleteInstallationComment", (userId) => {
    // get{ _id, comment }
  });
  socket.on("uploadFilesInstallation", () => {
    // get _id and files as an array with links need to replace in store
  });
  socket.on("deleteFilesInstallation", () => {
    // get _id and files as an array with links need to replace in store
  });
}
