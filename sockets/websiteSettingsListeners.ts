import { Socket } from "socket.io-client";
import type { Image } from "~/data/interfaces";

export default function settingsListeners(socket: Socket) {
  const websiteSettingsStore = useWebsiteSettingsStore();

  socket.on("deleteGalleryImage", (url: string) => {
    websiteSettingsStore.deleteGalleryImage(url);
  });

  socket.on("updateGalleryImage", ({ data, index }) => {
    websiteSettingsStore.editGalleryImage(index, data);
  });

  socket.on("newGalleryImage", (data: Image) => {
    websiteSettingsStore.addGalleryImage(data);
  });
}
