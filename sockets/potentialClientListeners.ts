import { Socket } from "socket.io-client";

export default function potentialClientListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("deletePotentialClient", () => {
    // get id to delete
  });

  socket.on("updatePotentialClient", () => {
    //
  });

  socket.on("selectAll", () => {
    //get value for all clients
  });

  socket.on("selectOne", () => {
    //get { _id, send,  value }
  });

  socket.on("newPotentialClient", () => {
    //get potential client object
  });
}
