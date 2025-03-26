import { Socket } from "socket.io-client";

export default function projectListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("", () => {
    // userStore.setUserOnline(userId);
  });

  socket.on("changeProjectStatus", () => {
    // get id and status of project
  });
}
