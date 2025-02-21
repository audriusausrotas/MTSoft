import { useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to) => {
  const useUser = useUserStore();
  const cookie = useCookie("mtud");

  if (
    !to.path.includes("pasiulymas") &&
    !to.path.includes("didmena") &&
    !to.path.includes("tvoros")
  ) {
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

    // vartonas service worker rerouting
    if (useUser.user?.accountType.toLowerCase() === "servisas") {
      if (to.path !== "/servisas") {
        return navigateTo("/servisas");
      } else {
        return;
      }
    }

    // fetch settings for everyone
    await fetchUserRights();

    const useSettings = useSettingsStore();
    const userRights = useSettings.userRights.find(
      (item) => item.accountType === useUser?.user?.accountType
    );

    switch (to.path) {
      case "/":
        if (userRights?.project) {
          await Promise.all([fetchProjects(), fetchGates(), fetchUsers(), fetchSelects()]);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case `/perziura/${to.params.id}`:
        if (userRights?.project) {
          await fetchProject(to.params.id);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/skaiciuokle":
        if (userRights?.project) {
          await Promise.all([fetchProducts(), fetchClients(), fetchDefaultValues()]);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/grafikas":
        if (userRights?.schedule) {
          await Promise.all([fetchSchedules(), fetchGamybas()]);
          if (useUser.user?.accountType === "Administratorius") await fetchProjects();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/gamyba":
        if (userRights?.production) {
          await fetchGamybas();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case `/gamyba/${to.params.id}`:
        if (userRights?.production) {
          await fetchGamyba(to.params.id);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/montavimas":
        if (userRights?.installation) {
          await Promise.all([fetchMontavimus(), fetchSchedules()]);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case `/montavimas/${to.params.id}`:
        if (userRights?.installation) {
          await fetchMontavima(to.params.id);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/vartai":
        if (userRights?.gate) {
          await fetchGates();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case `/vartai/${to.params.id}`:
        if (userRights?.gate) {
          await fetchGate(to.params.id);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/kainos":
        if (userRights?.admin) {
          await fetchProducts();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/pasiulymai":
        if (userRights?.admin) {
          await fetchPotentialClients();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/klientai":
        if (userRights?.admin) {
          await fetchClients();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/vartotojai":
        if (userRights?.admin) {
          await Promise.all([fetchUsers(), fetchSelects()]);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/nustatymai":
        if (userRights?.admin) {
          await Promise.all([
            fetchProducts(),
            fetchDefaultValues(),
            fetchUserRights(),
            fetchSelects(),
          ]);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/archyvas/archyvas":
        if (userRights?.admin) {
          await fetchArchives();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/archyvas/nepasitvirtine":
        if (userRights?.admin) {
          await fetchUnconfirmed();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/archyvas/istrinti":
        if (userRights?.admin) {
          await fetchDeleted();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/archyvas/atsargines_kopijos":
        if (userRights?.admin) {
          await fetchBackup();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case `/archyvas/${to.params.id}`:
        if (userRights?.admin) {
          await fetchArchive(to.params.id);
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;

      case "/bonusai":
        if (useUser.user?.username !== "Audrius" && useUser.user?.username !== "Andrius") {
          return navigateTo("/");
        }
        break;

      default:
        break;
    }
  } else {
    if (to.path.includes("pasiulymas"))
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
