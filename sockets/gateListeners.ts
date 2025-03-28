import { Socket } from "socket.io-client";

export default function gateListeners(socket: Socket) {
  const useGate = useGateStore();

  socket.on("newGateOrder", (gate) => {
    useGate.addGate(gate);
  });

  socket.on("changeGateStatus", ({ _id, status }) => {
    useGate.updateGateStatus(_id, status);
  });

  socket.on("updateGateOrder", ({ gate }) => {
    useGate.updateGate(gate);
  });

  socket.on("cancelGateOrder", ({ _id }) => {
    useGate.removeGates(_id);
  });
}
