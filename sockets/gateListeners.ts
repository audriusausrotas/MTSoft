import { Socket } from "socket.io-client";

export default function gateListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("userOnline", (userId) => {
    // userStore.setUserOnline(userId);
  });

  socket.on("userOffline", (userId) => {
    // userStore.setUserOffline(userId);
  });
}
