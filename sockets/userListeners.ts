import { Socket } from "socket.io-client";

export default function userListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("updateUserProfile", () => {
    // get user object
  });

  socket.on("updateUser", () => {
    // get user object
  });

  socket.on("deleteUser", () => {
    // get user id, delete from store
  });
}
