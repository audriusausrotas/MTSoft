import { Socket } from "socket.io-client";

export default function gateListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("newGateOrder", () => {
    // get gate object
  });

  socket.on("changeGateStatus", () => {
    // get id and status
  });

  socket.on("updateGateOrder", () => {
    // get gate object
  });

  socket.on("cancelGateOrder", () => {
    // get gate id
  });
}
