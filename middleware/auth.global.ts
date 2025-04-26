import request from "~/utils/request";

const isPublicPath = (path: string) =>
  path.includes("pasiulymas") || path.includes("didmena") || path.includes("tvoros");

const isValidAdminPath = (path: string) =>
  [
    "/kainos",
    "/bonusai",
    "/pasiulymai",
    "/klientai",
    "/vartotojai",
    "/nustatymai",
    "/archyvas/baigti",
    "/archyvas/archyvas",
    "/archyvas/nepasitvirtine",
    "/archyvas/istrinti",
    "/archyvas/atsargines_kopijos",
  ].includes(path);

const projectPaths = ["/", "/skaiciuokle"];
const schedulePaths = ["/grafikas"];
const productionPaths = ["/gamyba"];
const installationPaths = ["/montavimas"];
const gatePaths = ["/vartai"];

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const settingsStore = useSettingsStore();

  if (isPublicPath(to.path)) {
    if (to.path.includes("pasiulymas") && import.meta.server) {
      const success = await fetchOrder(to);
      if (!success && !to.name?.toString().includes("negalioja")) {
        return navigateTo(`/pasiulymas/${to.params.id}/negalioja`);
      }
    }
    return;
  }

  let user = userStore.user;
  if (!user) {
    const response = await fetchUser();
    if (!response.success) {
      // const logoutResponse = await request.get("logout");
      const isDevelopment = process.env.NODE_ENV === "development";
      let logoutResponse: any;

      if (isDevelopment) {
        logoutResponse = await request.get("logout");
      } else {
        const options: any = {
          method: "GET",
          credentials: "include",
        };
        logoutResponse = await $fetch(`https://mtsoft.lt/api/logout`, options);
      }
      if (logoutResponse.success) userStore.logout();

      if (to.path !== "/login") return navigateTo("/login");
      return;
    }

    user = response.data;
  }

  if (to.path === "/login") return navigateTo("/");

  if (user?.accountType.toLowerCase() === "servisas" && to.path !== "/servisas") {
    return navigateTo("/servisas");
  }

  let userRights = settingsStore.userRights.find((item) => item.accountType === user?.accountType);

  if (!userRights) {
    await fetchUserRights();
    userRights = settingsStore.userRights.find((item) => item.accountType === user?.accountType);
  }

  const isSingleArchiveView = to.path.startsWith("/archyvas/") && to.path.split("/").length === 3;

  if (import.meta.server && !isSingleArchiveView) {
    await fetchInitialUserData(userRights);
  }

  const premissionHandler = (paths: string[], right: boolean | undefined) => {
    if (paths.some((p) => to.path === p || to.path.includes(p)) && !right) {
      return navigateTo(middlewareHelper(userRights!));
    }
  };

  if (premissionHandler(projectPaths, userRights?.project)) return;
  if (premissionHandler(schedulePaths, userRights?.schedule)) return;
  if (premissionHandler(productionPaths, userRights?.production)) return;
  if (premissionHandler(installationPaths, userRights?.installation)) return;
  if (premissionHandler(gatePaths, userRights?.gate)) return;
  if (isValidAdminPath(to.path) && !userRights?.admin) {
    return navigateTo(middlewareHelper(userRights!));
  }
});
