import { useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to) => {
  const useUser = useUserStore();
  const cookie = useCookie("mtud");
  const useProjects = useProjectsStore();
  const useProducts = useProductsStore();
  const useGamyba = useGamybaStore();
  const useGates = useGateStore();

  if (!to.path.includes("pasiulymas")) {
    // authentificate in server from cookie
    if (cookie.value) {
      if (!useUser.user) {
        const { data }: any = await useFetch("/api/auth", {
          method: "post",
          body: {},
        });

        if (!data.value.data) {
          if (to.path !== "/login") {
            useUser.logout();
            return navigateTo("/login");
          }
        } else {
          useUser.setUser({ ...data.value.data });
        }
      }
    } else {
      if (to.path !== "/login") {
        useUser.logout();
        return navigateTo("/login");
      }
    }

    // fetches data in back/front
    if (useProjects.projects.length === 0) {
      const { data: gates }: any = await useFetch("/api/gates");
      if (gates.value.success) {
        useGates.addGates(gates.value.data);
      }

      if (useGamyba.gamybaList.length === 0) {
        const { data: gamyba }: any = await useFetch("/api/gamyba");
        if (gamyba.value.success) {
          useGamyba.addAll(gamyba.value.data);
        }
      }

      if (
        useUser.user?.accountType === "Administratorius" ||
        useUser.user?.accountType === "Paprastas vartotojas"
      ) {
        if (useProjects.projects.length === 0) {
          const { data: projects }: any = await useFetch("/api/project");
          if (projects.value.success) {
            useProjects.addProjects(projects.value.data);
          }
        }
        if (useProducts.products.length === 0) {
          const { data: products }: any = await useFetch("/api/products");
          if (products.value.success) {
            useProducts.addProducts(products.value.data);
          }
        }
        if (useUser.users.length === 0) {
          const { data: users }: any = await useFetch("/api/users");
          if (users.value.success) {
            useUser.setUsers([...users.value.data]);
          }
        }
      } else {
        switch (useUser.user?.accountType) {
          case "Vartonas":
            if (useUser.users.length === 0) {
              const { data: users }: any = await useFetch("/api/users");
              if (users.value.success) {
                const vartonasUsers = useUser.users.filter(
                  (user) => user.accountType === "Vartonas"
                );
                console.log("vartono -->>" + vartonasUsers);
                useUser.setUsers([...vartonasUsers]);
              }
            }
            if (to.path !== "/profilis") {
              if (to.path !== "/vartonas") return navigateTo("/vartonas");
            }
            break;
          case "Gigasta":
            if (to.path !== "/gigasta") return navigateTo("/gigasta");
            break;
          case "Montavimas":
            if (to.path !== "/montavimas") return navigateTo("/montavimas");
            break;
          case "Gamyba":
            if (to.path !== "/gamyba") return navigateTo("/gamyba");
            break;
          default:
            break;
        }
      }
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
    if (process.server) {
      const { data: offer }: any = await useFetch("/api/order", {
        method: "post",
        body: { _id: to.params.id },
      });
      if (offer.value.success) {
        const useOffer = useOfferStore();
        if (
          offer.value.data.status === "Nepatvirtintas" ||
          offer.value.data.status === "Netinkamas"
        ) {
          const currentDate = new Date();
          const exparationDate = new Date(offer.value.data.dateExparation);
          if (currentDate < exparationDate) {
            useOffer.setOffer({ ...offer.value.data });
          } else {
            const data: any = await $fetch("/api/archive", {
              method: "post",
              body: { _id: offer.value.data._id },
            } as any);

            if (data.success) {
              const pathName = to.name?.toString();
              if (!pathName?.includes("negalioja")) {
                return navigateTo(`/pasiulymas/${to.params.id}/negalioja`);
              }
            }
          }
        } else {
          useOffer.setOffer({ ...offer.value.data });
        }
      } else {
        const pathName = to.name?.toString();
        if (!pathName?.includes("negalioja")) {
          return navigateTo(`/pasiulymas/${to.params.id}/negalioja`);
        }
      }
    }
  }
});
