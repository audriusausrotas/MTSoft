export const useOfferStore = defineStore("offer", {
  state: () => ({
    offer: {} as any,
  }),

  actions: {
    setOffer(offer: any) {
      this.offer = { ...offer };
    },
  },

  getters: {},
});
