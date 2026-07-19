import { Socket } from "socket.io-client";

export default function settingsListeners(socket: Socket) {
  const settingsStore = useSettingsStore();

  socket.on("deleteSelect", ({ field, index }) => {
    settingsStore.deleteSelectValue(field, index);
  });

  socket.on("newSelectValue", ({ field, value }) => {
    settingsStore.newSelectValue(field, value);
  });

  socket.on("newDefaultValue", ({ value, field }) => {
    settingsStore.changeDefaultValue(value, field);
  });

  socket.on("newUserRights", (userRights) => {
    settingsStore.updateUserRights(userRights);
  });

  socket.on("newFence", (fence) => {
    settingsStore.newFence(fence);
  });

  socket.on("updateFenceSettings", (fence) => {
    settingsStore.updateFenceSettings(fence);
  });

  socket.on("deleteFenceSettings", ({ _id }) => {
    settingsStore.deleteFence(_id);
  });

  socket.on("updateGateData", (data) => {
    settingsStore.updateGateData(data);
  });
  socket.on("newReport", (data) => {
    settingsStore.newReport(data);
  });
  socket.on("editReport", (data) => {
    settingsStore.editReport(data);
  });
  socket.on("deleteReport", ({ _id }) => {
    settingsStore.deleteReport(_id);
  });
  socket.on("updateReportsGeneral", (data) => {
    settingsStore.addReportsGeneral(data);
  });
}
