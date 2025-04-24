import { Socket } from "socket.io-client";

export default function potentialClientListeners(socket: Socket) {
  const potentialClientsStore = usePotentialClientsStore();

  socket.on("deletePotentialClient", ({ _id }) => {
    potentialClientsStore.deletePotentialClient(_id);
  });

  socket.on("updatePotentialClient", (client) => {
    potentialClientsStore.updatePotentialClients(client);
  });

  socket.on("newPotentialClient", (client) => {
    potentialClientsStore.addPotentialClient(client);
  });
}
