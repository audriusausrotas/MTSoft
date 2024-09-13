// utils/fetchUtils.ts
export async function fetchUser() {
  const useUser = useUserStore();

  const { data }: any = await useFetch("/api/auth", {
    method: "post",
    body: {},
  });
  if (data.value.data) {
    useUser.setUser({ ...data.value.data });
  }
  return data.value.data;
}

export async function fetchGates() {
  const useGates = useGateStore();
  if (Object.keys(useGates.gates).length > 0) return;
  const { data }: any = await useFetch("/api/gates");
  if (data.value.success) {
    useGates.addGates(data.value.data);
  }
}

export async function fetchGamyba() {
  const useGamyba = useGamybaStore();
  if (useGamyba.gamybaList.length > 0) return;
  const { data }: any = await useFetch("/api/gamyba");
  if (data.value.success) {
    useGamyba.addAll(data.value.data);
  }
}

export async function fetchMontavimas() {
  const useMontavimas = useMontavimasStore();
  if (useMontavimas.montavimasList.length > 0) return;
  const { data }: any = await useFetch("/api/montavimas");
  if (data.value.success) {
    useMontavimas.addAll(data.value.data);
  }
}

export async function fetchProjects() {
  const useProjects = useProjectsStore();
  if (useProjects.projects.length > 0) return;
  const { data }: any = await useFetch("/api/project");
  if (data.value.success) {
    useProjects.addProjects(data.value.data);
  }
}

export async function fetchProducts() {
  const useProducts = useProductsStore();
  if (useProducts.products.length > 0) return;
  const { data }: any = await useFetch("/api/products");
  if (data.value.success) {
    useProducts.addProducts(data.value.data);
  }
}

export async function fetchUsers() {
  const useUser = useUserStore();
  if (useUser.users.length > 0) return;
  const { data }: any = await useFetch("/api/users");
  if (data.value.success) {
    useUser.setUsers([...data.value.data]);
  }
}

export async function fetchArchive() {
  const useProjects = useProjectsStore();
  if (useProjects.archive.length > 0) return;
  const { data: archive }: any = await useFetch("/api/archive");
  if (archive.value.success) {
    useProjects.addArchives([...archive.value.data]);
    useProjects.addArchives([...archive.value.data]);
  }
}

export async function fetchOrder(to: any) {
  let success = true;

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
          success = false;
        }
      }
    } else {
      useOffer.setOffer({ ...offer.value.data });
    }
  } else {
    success = false;
  }
  return success;
}
