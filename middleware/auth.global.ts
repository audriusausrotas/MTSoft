import request from "~/utils/request";

const isPublicPath = (path: string) =>
  path.includes("pasiulymas") ||
  path.includes("didmena") ||
  path.includes("tvoros") ||
  path.includes("zaliuzes");

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const settingsStore = useSettingsStore();

  if (isPublicPath(to.path)) {
    if (import.meta.server) {
      if (to.path.includes("didmena") || to.path.includes("tvoros"))
        await fetchFences();

      if (to.path.includes("pasiulymas")) {
        !(await fetchOrder(to)) &&
          navigateTo(`/pasiulymas/${to.params.id}/negalioja`);
      }
    }
    return;
  }

  let user = userStore.user;
  if (!user) {
    const response = await fetchUser();
    if (!response.success) {
      const logoutResponse = await request.get("logout");
      if (logoutResponse.success) userStore.logout();

      if (to.path !== "/login") return navigateTo("/login");
      return;
    }

    user = response.data;
  }

  if (to.path === "/login") return navigateTo("/");

  if (user?.accountType.toLowerCase() === "servisas" && to.path !== "/servisas")
    return navigateTo("/servisas");

  let userRights = settingsStore.userRights.find(
    (item) => item.accountType === user?.accountType
  );

  if (!userRights) {
    await fetchUserRights();
    userRights = settingsStore.userRights.find(
      (item) => item.accountType === user?.accountType
    );
  }

  if (import.meta.server) {
    await fetchInitialUserData(userRights);
  }

  switch (to.path) {
    case "/":
      if (!userRights?.project)
        return navigateTo(middlewareHelper(userRights!));
      break;
    case "/skaiciuokle":
      if (!userRights?.project)
        return navigateTo(middlewareHelper(userRights!));
      break;
    case "/grafikas":
      if (!userRights?.schedule)
        return navigateTo(middlewareHelper(userRights!));
      break;
    case "/gamyba":
      if (!userRights?.production)
        return navigateTo(middlewareHelper(userRights!));
      break;
    case "/montavimas":
      if (!userRights?.installation)
        return navigateTo(middlewareHelper(userRights!));
      break;
    case "/sandelys":
      if (!userRights?.warehouse)
        return navigateTo(middlewareHelper(userRights!));
      break;
    case "/uzsakymai":
      if (!userRights?.orders) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/vartai":
      if (!userRights?.gate) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/kainos":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/bonusai":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/pasiulymai":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/klientai":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/tiekejai":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/vartotojai":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/nustatymai":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/archyvas/baigti":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/archyvas/archyvas":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/archyvas/nepasitvirtine":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/archyvas/istrinti":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;
    case "/archyvas/atsargines_kopijos":
      if (!userRights?.admin) return navigateTo(middlewareHelper(userRights!));
      break;

    default:
      break;
  }
});
