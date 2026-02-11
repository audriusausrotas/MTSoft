import type { Image, WebsiteSettings } from "~/data/interfaces";

export const useWebsiteSettingsStore = defineStore("websiteSettingsStore", {
  state: () => ({
    websiteSettings: {
      gallery: [],
      funded: [],
    } as WebsiteSettings,
  }),

  actions: {
    addWebsiteSettings(data: WebsiteSettings) {
      this.websiteSettings.gallery = data.gallery;
      this.websiteSettings.funded = data.funded;
    },

    addGalleryImage(data: Image) {
      this.websiteSettings.gallery.push(data);
    },

    addFundedImage(data: Image) {
      this.websiteSettings.funded.push(data);
    },

    editGalleryImage(index: number, data: Image) {
      const item = this.websiteSettings.gallery[index];
      if (item) {
        Object.assign(item, data);
      }
    },

    editFundedImage(index: number, data: Image) {
      const item = this.websiteSettings.funded[index];
      if (item) {
        Object.assign(item, data);
      }
    },

    deleteGalleryImage(url: string) {
      const index = this.websiteSettings.gallery.findIndex((item) => item.url === url);
      this.websiteSettings.gallery.splice(index, 1);
    },

    deleteFundedImage(url: string) {
      const index = this.websiteSettings.funded.findIndex((item) => item.url === url);
      this.websiteSettings.funded.splice(index, 1);
    },
  },

  getters: {},
});
