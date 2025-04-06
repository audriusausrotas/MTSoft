import { Socket } from "socket.io-client";

export default function potentialClientListeners(socket: Socket) {
  const usePotentialClients = usePotentialClientsStore();

  socket.on("deletePotentialClient", (_id) => {
    usePotentialClients.deletePotentialClient(_id);
  });

  socket.on("updatePotentialClient", (client) => {
    usePotentialClients.updatePotentialClients(client);
  });

  socket.on("selectAll", (value) => {
    usePotentialClients.selectPotentialClients(value);
  });

  socket.on("selectOne", ({ _id, send }) => {
    usePotentialClients.selectPotentialClient(_id, send);
  });

  socket.on("newPotentialClient", (client) => {
    usePotentialClients.addPotentialClient(client);
  });
}
