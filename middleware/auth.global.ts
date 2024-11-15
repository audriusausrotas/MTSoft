import { useCookie } from "nuxt/app";

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
        } else {
          await fetchUsers();
        }
      }
    } else {
      if (to.path !== "/login") {
        useUser.logout();
        return navigateTo("/login");
      }
    }

    if (
      useUser.user?.accountType !== "Administratorius" &&
      useUser.user?.accountType !== "Paprastas vartotojas"
    ) {
      switch (useUser.user?.accountType) {
        case "Vartonas":
          if (to.path !== "/profilis") {
            if (!to.path.includes("/vartai")) return navigateTo("/vartai");
          }

          break;

        case "Gigasta":
          if (to.path !== "/profilis") {
            if (!to.path.includes("/vartai")) return navigateTo("/vartai");
          }
          break;

        case "Montavimas":
          if (to.path !== "/profilis" && to.path !== "/grafikas") {
            if (!to.path.includes("/montavimas"))
              return navigateTo("/grafikas");
          }
          break;

        case "Gamyba":
          if (to.path !== "/profilis" && to.path !== "/grafikas") {
            if (!to.path.includes("/gamyba")) return navigateTo("/gamyba");
          }
          break;

        default:
          break;
      }
    } else {
      //fetch settings
      // await fetchSelects();
    }

    if (to.path === "/") {
      await Promise.all([fetchProjects(), fetchGates(), fetchUsers()]);
    }

    if (to.path === `/perziura/${to.params.id}`) {
      await fetchProject(to.params.id);
    }

    if (to.path === "/naujas") {
      await Promise.all([
        fetchProducts(),
        fetchClients(),
        fetchDefaultValues(),
      ]);
      // await fetchProducts();
      // await fetchClients();
      // await fetchDefaultValues();
    }

    if (to.path === "/grafikas") {
      await fetchSchedules();
      await fetchGamybas();
      if (useUser.user?.accountType === "Administratorius")
        await fetchProjects();
    }

    if (to.path === "/gamyba") {
      await fetchGamybas();
    }

    if (to.path === `/gamyba/${to.params.id}`) {
      await fetchGamyba(to.params.id);
    }

    if (to.path === "/montavimas") {
      await Promise.all([fetchMontavimus(), fetchSchedules()]);
    }

    if (to.path === `/montavimas/${to.params.id}`) {
      await fetchMontavima(to.params.id);
    }

    if (to.path === "/vartai") {
      await fetchGates();
    }
    if (to.path === `/vartai/${to.params.id}`) {
      await fetchGate(to.params.id);
    }

    if (to.path === "/kainos") {
      await fetchProducts();
    }
    if (to.path === "/klientai") {
      await fetchClients();
    }

    if (to.path === "/vartotojai") {
      await fetchUsers();
    }

    if (to.path === "/nustatymai") {
      await Promise.all([fetchProducts(), fetchDefaultValues()]);
    }

    if (to.path === "/archyvas") {
      await fetchArchives();
    }
    if (to.path === `/archyvas/${to.params.id}`) {
      await fetchArchive(to.params.id);
    }

    if (to.path === "/bonusai") {
      if (
        useUser.user?.username !== "Audrius" &&
        useUser.user?.username !== "Andrius"
      ) {
        return navigateTo("/");
      }
    }
  } else {
    if (import.meta.server) {
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
