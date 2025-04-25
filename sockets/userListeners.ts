import { Socket } from "socket.io-client";

export default function userListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("updateUserProfile", (user) => {
    userStore.updateUser(user);
  });

  socket.on("updateUser", (user) => {
    userStore.updateUser(user);
  });

  socket.on("deleteUser", ({ _id }) => {
    userStore.deleteUser(_id);
  });

  socket.on("newUser", (user) => {
    userStore.addUser(user);
  });
}
