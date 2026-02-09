import type { Image, WebsiteSettings } from "~/data/interfaces";

export const useWebsiteSettingsStore = defineStore("websiteSettingsStore", {
  state: () => ({
    websiteSettings: {
      gallery: [],
    } as WebsiteSettings,
  }),

  actions: {
    addWebsiteSettings(data: WebsiteSettings) {
      this.websiteSettings.gallery = data.gallery;
    },

    addGalleryImage(data: Image) {
      this.websiteSettings.gallery.push(data);
    },

    editGalleryImage(index: number, data: Image) {
      const item = this.websiteSettings.gallery[index];
      if (item) {
        Object.assign(item, data);
      }
    },

    deleteGalleryImage(url: string) {
      const index = this.websiteSettings.gallery.findIndex((item) => item.url === url);
      this.websiteSettings.gallery.splice(index, 1);
    },
  },

  getters: {},
});
