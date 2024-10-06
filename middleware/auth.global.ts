import { useCookie } from "nuxt/app";
import {
  fetchUser,
  fetchGates,
  fetchGamyba,
  fetchProjects,
  fetchProducts,
  fetchUsers,
  fetchArchives,
  fetchMontavimas,
  fetchSchedules,
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

    if (to.path === "/archyvas") {
      await fetchArchives();
    }

    if (to.path.includes("/grafikas")) {
      await fetchUsers();
      await fetchSchedules();
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
            if (!to.path.includes("/vartai")) return navigateTo("/vartai");
          }
          break;

        case "Gigasta":
          await fetchGates();
          await fetchUsers();
          if (to.path !== "/profilis") {
            if (!to.path.includes("/vartai")) return navigateTo("/vartai");
          }
          break;

        case "Montavimas":
          await fetchMontavimas();
          await fetchSchedules();
          if (to.path !== "/profilis" && to.path !== "/grafikas") {
            if (!to.path.includes("/montavimas")) return navigateTo("/grafikas");
          }
          break;

        case "Gamyba":
          await fetchGamyba();
          await fetchUsers();
          await fetchSchedules();
          if (to.path !== "/profilis" && to.path !== "/grafikas") {
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
