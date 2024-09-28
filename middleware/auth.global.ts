import { useCookie } from "nuxt/app";
import {
  fetchUser,
  fetchGates,
  fetchGamyba,
  fetchProjects,
  fetchProducts,
  fetchUsers,
  fetchArchive,
  fetchMontavimas,
} from "~/utils/fetchData";

export default defineNuxtRouteMiddleware(async (to) => {
  const useUser = useUserStore();
  const cookie = useCookie("mtud");

  if (!to.path.includes("pasiulymas")) {
    // authentificate in server from cookie
    if (cookie.value) {
      if (!useUser.user) {
        const data: any = await fetchUser();
        if (!data) {
          if (to.path !== "/login") {
            useUser.logout();
            return navigateTo("/login");
          }
        }
      }
    } else {
      if (to.path !== "/login") {
        useUser.logout();
        return navigateTo("/login");
      }
    }

    if (to.path.includes("archyvas")) {
      await fetchArchive();
    }

    if (to.path.includes("grafikas")) {
      await fetchUsers();
    }

    // fetches data in back/front

    if (
      useUser.user?.accountType === "Administratorius" ||
      useUser.user?.accountType === "Paprastas vartotojas"
    ) {
      await fetchProjects();
      await fetchProducts();
      await fetchUsers();
      await fetchGates();
      await fetchGamyba();
      await fetchMontavimas();
    } else {
      switch (useUser.user?.accountType) {
        case "Vartonas":
          await fetchGates();
          await fetchUsers();
          if (to.path !== "/profilis") {
            if (to.path !== "/vartonas") return navigateTo("/vartonas");
          }
          break;

        case "Gigasta":
          await fetchGates();
          await fetchUsers();
          if (to.path !== "/profilis") {
            if (to.path !== "/gigasta") return navigateTo("/gigasta");
          }
          break;

        case "Montavimas":
          await fetchMontavimas();
          if (to.path !== "/profilis" && to.path !== "/grafikas") {
            if (!to.path.includes("/montavimas")) return navigateTo("/montavimas");
          }
          break;

        case "Gamyba":
          await fetchGamyba();
          if (to.path !== "/profilis") {
            if (!to.path.includes("/gamyba")) return navigateTo("/gamyba");
          }
          break;

        default:
          break;
      }
    }

    if (to.path === "/bonusai") {
      if (useUser.user?.username !== "Audrius" && useUser.user?.username !== "Andrius") {
        return navigateTo("/");
      }
    }
  } else {
    if (process.server) {
      const success = await fetchOrder(to);
      if (!success) {
        const pathName = to.name?.toString();
        if (!pathName?.includes("negalioja")) {
          return navigateTo(`/pasiulymas/${to.params.id}/negalioja`);
        }
      }
    }
  }
});
