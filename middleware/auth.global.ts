import { useCookie } from "nuxt/app";
import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const useUser = useUserStore();
  const cookie = useCookie("mtud");

  if (!to.path.includes("pasiulymas")) {
    console.log("1");
    if (process.client) {
      console.log("2");
      if (!cookie.value) {
        console.log("3");
        if (to.path !== "/login") {
          console.log("4");
          useUser.logout();
          return navigateTo("/login");
          console.log("5");
        }
      }
      console.log("6");
      if (!useUser.user) {
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
        useUser.setUser({ ...data.value.data });
      }
    }

    if (process.server) {
      console.log("13");
      if (cookie.value) {
        console.log("14");
        const { data }: any = await useFetch("/api/auth", {
          method: "post",
          body: {},
        });
        console.log("15");
        if (!data?.value?.data) {
          console.log("16");
          if (to.path !== "/login") {
            useUser.logout();
            console.log("17");
            return navigateTo("/login");
          }
          console.log("18");
        } else {
          console.log("19");
          useUser.setUser({ ...data?.value?.data });
        }
      } else {
        console.log("20");
        if (to.path !== "/login") {
          useUser.logout();
          console.log("21");
          return navigateTo("/login");
        }
      }
    }
  }
});
