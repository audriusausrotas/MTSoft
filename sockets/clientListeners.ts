import { Socket } from "socket.io-client";

export default function clientListeners(socket: Socket) {
  const clientsStore = useClientsStore();

  socket.on("deleteClient", ({ _id }) => {
    clientsStore.deleteClient(_id);
  });

  socket.on("newClient", (client) => {
    clientsStore.addClient(client);
  });
}
