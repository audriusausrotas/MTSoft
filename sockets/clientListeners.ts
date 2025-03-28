import { Socket } from "socket.io-client";

export default function clientListeners(socket: Socket) {
  const useClient = useClientsStore();

  socket.on("deleteClient", ({ _id }) => {
    useClient.deleteClient(_id);
  });

  socket.on("newClient", (client) => {
    useClient.addClient(client);
  });
}
