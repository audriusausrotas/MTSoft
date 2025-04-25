import request from "~/utils/request";

export default defineNuxtRouteMiddleware(async (to) => {
  if (
    to.path.includes("pasiulymas") ||
    to.path.includes("didmena") ||
    to.path.includes("tvoros")
  ) {
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
        const response = await request.get("logout");
        if (response.success) {
          const userStore = useUserStore();
          userStore.logout();
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

    const userRights = useSettingsStore().userRights.find(
      (item) => item.accountType === user.data.accountType
    );

    if (to.path === "/")
      if (userRights?.project) {
        await Promise.all([
          fetchProjects(),
          fetchGates(),
          fetchUsers(),
          fetchSelects(),
        ]);
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path.includes("perziura"))
      if (userRights?.project) {
        await Promise.all([fetchProjects()]);
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/skaiciuokle")
      if (userRights?.project) {
        await Promise.all([
          fetchProducts(),
          fetchClients(),
          fetchDefaultValues(),
        ]);
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/grafikas")
      if (userRights?.schedule) {
        await Promise.all([fetchSchedules(), fetchProduction()]);
        if (user.data.accountType === "Administratorius") await fetchProjects();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path.includes("/gamyba"))
      if (userRights?.production) {
        await fetchProduction();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path.includes("/montavimas"))
      if (userRights?.installation) {
        await Promise.all([fetchInstallation(), fetchSchedules()]);
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path.includes("/vartai"))
      if (userRights?.gate) {
        await fetchGates();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/kainos")
      if (userRights?.admin) {
        await fetchProducts();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/pasiulymai")
      if (userRights?.admin) {
        await fetchPotentialClients();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/klientai")
      if (userRights?.admin) {
        await fetchClients();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/vartotojai")
      if (userRights?.admin) {
        await Promise.all([fetchUsers(), fetchSelects()]);
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/nustatymai")
      if (userRights?.admin) {
        await Promise.all([
          fetchProducts(),
          fetchDefaultValues(),
          fetchUserRights(),
          fetchSelects(),
        ]);
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/archyvas/archyvas")
      if (userRights?.admin) {
        await fetchArchives();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/archyvas/nepasitvirtine")
      if (userRights?.admin) {
        await fetchUnconfirmed();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/archyvas/istrinti")
      if (userRights?.admin) {
        await fetchDeleted();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/archyvas/atsargines_kopijos")
      if (userRights?.admin) {
        await fetchBackup();
        return;
      } else {
        return navigateTo(middlewareHelper(userRights!));
      }

    if (to.path === "/bonusai")
      if (
        user.data.username !== "Audrius" &&
        user.data.username !== "Andrius"
      ) {
        return navigateTo("/");
      }
  }
});
