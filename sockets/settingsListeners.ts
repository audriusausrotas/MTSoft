import { Socket } from "socket.io-client";

export default function settingsListeners(socket: Socket) {
  const useSettings = useSettingsStore();

  socket.on("deleteSelect", ({ field, index }) => {
    useSettings.deleteSelectValue(field, index);
  });

  socket.on("newSelectValue", ({ field, value }) => {
    useSettings.newSelectValue(field, value);
  });

  socket.on("updateFenceSettings", (fence) => {
    useSettings.updateFenceSettings(fence);
  });

  socket.on("newDefaultValue", ({ value, field }) => {
    useSettings.changeDefaultValue(value, field);
  });

  socket.on("newUserRights", (userRights) => {
    useSettings.updateUserRights(userRights);
  });
}
