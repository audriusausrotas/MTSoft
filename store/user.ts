import type { User } from "~/data/interfaces";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    users: [] as User[],
  }),

  actions: {
    setUser(data: User) {
      this.user = data;
    },

    logout() {
      this.user = null;
      this.users = [];
    },

    setUsers(users: User[]) {
      this.users = [...users];
    },

    addUser(user: User) {
      this.users.push(user);
    },

    updateUser(data: User) {
      this.users = this.users.map((user) =>
        user._id === data._id ? data : user
      );
    },

    deleteUser(id: string) {
      this.users = this.users.filter((user) => user._id !== id);
    },
  },

  getters: {},
});
