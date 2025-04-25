import { Socket } from "socket.io-client";

export default function settingsListeners(socket: Socket) {
  const settingsStore = useSettingsStore();

  socket.on("deleteSelect", ({ field, index }) => {
    settingsStore.deleteSelectValue(field, index);
  });

  socket.on("newSelectValue", ({ field, value }) => {
    settingsStore.newSelectValue(field, value);
  });

  socket.on("updateFenceSettings", (fence) => {
    settingsStore.updateFenceSettings(fence);
  });

  socket.on("newDefaultValue", ({ value, field }) => {
    settingsStore.changeDefaultValue(value, field);
  });

  socket.on("newUserRights", (userRights) => {
    settingsStore.updateUserRights(userRights);
  });
}
