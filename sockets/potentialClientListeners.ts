import { Socket } from "socket.io-client";

export default function potentialClientListeners(socket: Socket) {
  const usePotentialClients = usePotentialClientsStore();

  socket.on("deletePotentialClient", ({ _id }) => {
    usePotentialClients.deletePotentialClient(_id);
  });

  socket.on("updatePotentialClient", (client) => {
    usePotentialClients.updatePotentialClients(client);
  });

  socket.on("newPotentialClient", (client) => {
    usePotentialClients.addPotentialClient(client);
  });
}
