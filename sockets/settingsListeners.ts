import { Socket } from "socket.io-client";

export default function settingsListeners(socket: Socket) {
  const userStore = useUserStore();

  socket.on("deleteSelect", (userId) => {
    // get all selects i think..
  });
  socket.on("newSelectValue", (userId) => {
    // get all selects i think..
  });

  socket.on("updateFenceSettings", (userId) => {
    // get all selects i think..
  });

  socket.on("newDefaultValue", (userId) => {
    // get all selects i think..
  });

  socket.on("newUserRights", (userId) => {
    // get all userRights
  });
}
