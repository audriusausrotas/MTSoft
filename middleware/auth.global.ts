import request from "~/utils/request";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.includes("pasiulymas") || to.path.includes("didmena") || to.path.includes("tvoros")) {
    if (to.path.includes("pasiulymas")) {
      if (import.meta.server) {
        const success = await fetchOrder(to);
        if (!success)
          if (!to.name?.toString().includes("negalioja"))
            return navigateTo(`/pasiulymas/${to.params.id}/negalioja`);
      }
    }
  } else {
    const user: any = await fetchUser();

    if (user.success) {
      if (user.data) {
        if (to.path === "/login") return navigateTo("/");
      } else {
        const data = await request.get("logout");
        if (data.success) {
          const useUser = useUserStore();
          useUser.logout();
          const router = useRouter();
          router.push("/login");
        }

        if (to.path !== "/login") return navigateTo("/login");
      }
    } else {
      if (to.path !== "/login") return navigateTo("/login");
      else return;
    }

    // vartonas service worker rerouting
    if (user.data.accountType.toLowerCase() === "servisas")
      if (to.path !== "/servisas") return navigateTo("/servisas");
      else return;

    // fetch settings for everyone
    await Promise.all([fetchUsers(), fetchUserRights()]);

    const useSettings = useSettingsStore();
    const userRights = useSettings.userRights.find(
      (item) => item.accountType === user.data.accountType
    );
    switch (to.path) {
      case "/":
        if (userRights?.project) {
          await Promise.all([fetchProjects(), fetchGates(), fetchUsers(), fetchSelects()]);
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
          await Promise.all([fetchSchedules(), fetchProduction()]);
          if (user.data.accountType === "Administratorius") await fetchProjects();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;
      case "/gamyba":
        if (userRights?.production) {
          await fetchProduction();
        } else {
          return navigateTo(middlewareHelper(userRights!));
        }
        break;
      case "/montavimas":
        if (userRights?.installation) {
          await Promise.all([fetchInstallation(), fetchSchedules()]);
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
      case "/bonusai":
        if (user.data.username !== "Audrius" && user.data.username !== "Andrius") {
          return navigateTo("/");
        }
        break;
      default:
        break;
    }
  }
});
