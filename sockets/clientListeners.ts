import { Socket } from "socket.io-client";

export default function clientListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("deleteClient", (userId) => {
    // get _id. need to delete from store
  });

  socket.on("newClient", (userId) => {
    // get client object
  });
}
