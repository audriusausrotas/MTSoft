import { useCookie } from "nuxt/app";
import { useUserStore } from "~/store/user";
import { useOfferStore } from "~/store/offer";

export default defineNuxtRouteMiddleware(async (to) => {
  const useUser = useUserStore();
  const cookie = useCookie("mtud");

  if (!to.path.includes("pasiulymas")) {
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
          }

          if (
            data.value.data.accountType !== "Administratorius" ||
            data.value.data.accountType !== "Paprastas vartotojas"
          ) {
            switch (data.value.data.accountType) {
              case "Vartonas":
                if (to.path !== "/vartonas") return navigateTo("/vartonas");
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
        useOffer.setOffer({ ...offer.value.data });
      }
    }
  }
});
