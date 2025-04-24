import { Socket } from "socket.io-client";

export default function gateListeners(socket: Socket) {
  const gateStore = useGateStore();

  socket.on("newGateOrder", (gate) => {
    gateStore.addGate(gate);
  });

  socket.on("changeGateStatus", ({ _id, status }) => {
    gateStore.updateGateStatus(_id, status);
  });

  socket.on("updateGateOrder", (gate) => {
    gateStore.updateGate(gate);
  });

  socket.on("cancelGateOrder", ({ _id }) => {
    gateStore.removeGates(_id);
  });
}
