import { Socket } from "socket.io-client";

export default function userListeners(socket: Socket) {
  const useUser = useUserStore();

  socket.on("updateUserProfile", (user) => {
    useUser.updateUser(user);
  });

  socket.on("updateUser", (user) => {
    useUser.updateUser(user);
  });

  socket.on("deleteUser", (_id) => {
    useUser.deleteUser(_id);
  });
}
