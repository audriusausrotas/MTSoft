import { useCookie } from "nuxt/app";
import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const useUser = useUserStore();
  const cookie = useCookie("mtud");

  if (!to.path.includes("pasiulymas")) {
    if (process.client) {
      if (!cookie.value) {
        console.log("3");
        if (to.path !== "/login") {
          console.log("4");
          useUser.logout();
          return navigateTo("/login");
        }
      }
      console.log(cookie);
      console.log(cookie.value);
      if (cookie.value && !useUser.user) {
        console.log("7");
        const { data }: any = await useFetch("/api/auth", {
          method: "post",
          body: {},
        });
        console.log("8");

        if (!data?.value?.data) {
          console.log("9");
          if (to.path !== "/login") {
            console.log("10");
            useUser.logout();
            console.log("11");
            return navigateTo("/login");
          }
        }
        console.log("12");
        useUser.setUser({ ...data?.value?.data });
      }
    }

    if (process.server) {
      if (cookie.value) {
        const { data }: any = await useFetch("/api/auth", {
          method: "post",
          body: {},
        });

        if (!data?.value?.data) {
          if (to.path !== "/login") {
            useUser.logout();

            return navigateTo("/login");
          }
        } else {
          useUser.setUser({ ...data?.value?.data });
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
