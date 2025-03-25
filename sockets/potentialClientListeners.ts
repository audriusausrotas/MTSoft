import { Socket } from "socket.io-client";

export default function potentialClientListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("userOnline", (userId) => {
    // userStore.setUserOnline(userId);
  });

  socket.on("userOffline", (userId) => {
    // userStore.setUserOffline(userId);
  });
}
