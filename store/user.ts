import { useCookie } from "nuxt/app";
import type { User } from "~/data/interfaces";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    users: [] as User[],
  }),

  actions: {
    async setUser(data: User) {
      this.user = data;
    },

    logout() {
      this.user = null;
      const cookie = useCookie("mtud");
      cookie.value = null;
      this.users = [];
    },

    setAllUsers(data: User[]) {
      this.users = data;
    },
  },

  getters: {
    updateUser: (state) => (data: User) => {
      state.users = state.users.map((user) => {
        if (user._id === data._id) return data;
        else return user;
      });
    },

    deleteUser: (state) => (id: string) => {
      state.users = state.users.filter((user) => user._id !== id);
    },
  },
});
