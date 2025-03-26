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

  socket.on("installationUpdatePostone", (userId) => {
    // get { _id, index, measureIndex, value }
  });

  socket.on("installationUpdateDone", (userId) => {
    // get { _id, index, measureIndex, value }
  });
  socket.on("installationUpdateStatus", (userId) => {
    // get { _id, status }
  });
}
