import { useCookie } from "nuxt/app";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    users: [],
  }),

  actions: {
    async setUser(data) {
      this.user = data;
    },

    logout() {
      this.user = null;
      const cookie = useCookie("mtud");
      cookie.value = null;
      this.users = [];
    },
    setAllUsers(data) {
      this.users = data;
    },
  },
  getters: {
    updateUser: (state) => (data) => {
      state.users = state.users.map((user) => {
        if (user._id === data._id) return data;
        else return user;
      });
    },
    deleteUser: (state) => (data) => {
      state.users = state.users.filter((user) => user._id !== data);
    },
  },
});
