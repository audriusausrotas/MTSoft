import { useCookie } from "nuxt/app";
import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const useUser = useUserStore();
  const cookie = useCookie("mtud");

  if (!to.path.includes("pasiulymas")) {
    if (process.client) {
      if (!cookie.value) {
        if (to.path !== "/login") {
          useUser.logout();
          return navigateTo("/login");
        }
      }

      if (!useUser.user) {
        const { data }: any = await useFetch("/api/auth", {
          method: "post",
          body: {},
        });

        if (!data.value.data) {
          if (to.path !== "/login") {
            useUser.logout();
            return navigateTo("/login");
          }
        }
        useUser.setUser({ ...data.value.data });
      }
    }

    if (process.server) {
      if (cookie.value) {
        const { data }: any = await useFetch("/api/auth", {
          method: "post",
          body: {},
        });
        if (!data.value.data) {
          if (to.path !== "/login") {
            useUser.logout();
            return navigateTo("/login");
          }
        } else {
          useUser.setUser({ ...data.value.data });
        }
      } else {
        if (to.path !== "/login") {
          useUser.logout();
          return navigateTo("/login");
        }
      }
    }
  }
});
