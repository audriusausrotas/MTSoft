import { useCookie } from "nuxt/app";
import { useUserStore } from "~/store/user";
import { useOfferStore } from "~/store/offer";

export default defineNuxtRouteMiddleware(async (to) => {
  const useUser = useUserStore();
  const cookie = useCookie("mtud");

  if (!to.path.includes("pasiulymas")) {
    if (process.client) {
      if (to.path === "/bonusai") {
        if (
          useUser.user?.username !== "Audrius" &&
          useUser.user?.username !== "Andrius"
        ) {
          return navigateTo("/");
        }
      }

      const useProjects = useProjectsStore();
      if (useProjects.projects.length === 0) {
        const { data: gates }: any = await useFetch("/api/gates");
        if (gates.value.success) {
          const useGates = useGateStore();
          useGates.addGates(gates.value.data);
        }

        if (
          useUser.user?.accountType === "Administratorius" ||
          useUser.user?.accountType === "Paprastas vartotojas"
        ) {
          const { data: projects }: any = await useFetch("/api/project");
          if (projects.value.success) {
            const useProjects = useProjectsStore();
            useProjects.addProjects(projects.value.data);
          }

          const { data: products }: any = await useFetch("/api/products");
          if (products.value.success) {
            const useProducts = useProductsStore();
            useProducts.addProducts(products.value.data);
          }

          const { data: users }: any = await useFetch("/api/users");
          if (users.value.success) {
            useUser.setUsers([...users.value.data]);
          }
        } else {
          switch (useUser.user?.accountType) {
            case "Vartonas":
              if (to.path !== "/vartonas") return navigateTo("/vartonas");
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
    }

    if (process.server) {
      if (cookie.value) {
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

          const { data: gates }: any = await useFetch("/api/gates");
          if (gates.value.success) {
            const useGates = useGateStore();
            useGates.addGates(gates.value.data);
          }

          if (
            data.value.data.accountType === "Administratorius" ||
            data.value.data.accountType === "Paprastas vartotojas"
          ) {
            const { data: projects }: any = await useFetch("/api/project");
            if (projects.value.success) {
              const useProjects = useProjectsStore();
              useProjects.addProjects(projects.value.data);
            }

            const { data: products }: any = await useFetch("/api/products");
            if (products.value.success) {
              const useProducts = useProductsStore();
              useProducts.addProducts(products.value.data);
            }

            const { data: users }: any = await useFetch("/api/users");
            if (users.value.success) {
              useUser.setUsers([...users.value.data]);
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

          if (
            data.value.data.accountType !== "Administratorius" ||
            data.value.data.accountType !== "Paprastas vartotojas"
          ) {
            switch (data.value.data.accountType) {
              case "Vartonas":
                if (to.path !== "/vartonas") return navigateTo("/vartonas");
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
      } else {
        if (to.path !== "/login") {
          useUser.logout();
          return navigateTo("/login");
        }
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
          offer.status === "Nepatvirtintas" ||
          offer.status === "Netinkamas"
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
