export async function fetchUser() {
  const useUser = useUserStore();
  try {
    const data: any = await request.get("getUser");

    if (data.success) {
      useUser.setUser(data.data);
    }
    return data;
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchGates() {
  const useGates = useGateStore();
  if (!useGates.gates.length) {
    try {
      const data: any = await request.get("getGates");
      if (data.success) {
        useGates.addGates(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchProduction() {
  const useGamyba = useGamybaStore();
  if (!useGamyba.gamybaList.length) {
    try {
      const data: any = await request.get("getProduction");
      if (data.success) {
        useGamyba.addAll(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchInstallation() {
  const useMontavimas = useMontavimasStore();
  if (!useMontavimas.montavimasList.length) {
    try {
      const data: any = await request.get("getWorks");

      if (data.success) {
        useMontavimas.addAll(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchProjects() {
  const useProjects = useProjectsStore();
  if (!useProjects.projects.length) {
    try {
      const data: any = await request.get("getProjects");
      if (data.success) {
        useProjects.addProjects(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchProducts() {
  const useProducts = useProductsStore();
  if (!useProducts.products.length) {
    try {
      const data: any = await request.get("getProducts");
      if (data.success) {
        useProducts.addProducts(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchUsers() {
  const useUser = useUserStore();
  if (!useUser.users.length) {
    try {
      const data: any = await request.get("getUsers");
      if (data.success) {
        useUser.setUsers(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchArchives() {
  const useArchives = useArchivesStore();
  if (!useArchives.archives.length) {
    try {
      const data: any = await request.get("getArchives");
      if (data.success) {
        useArchives.addArchives(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchUnconfirmed() {
  const useArchives = useArchivesStore();
  if (!useArchives.unconfirmed.length) {
    try {
      const data: any = await request.get("getUnconfirmed");
      if (data.success) {
        useArchives.addUnconfirmed(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchDeleted() {
  const useArchives = useArchivesStore();
  if (!useArchives.deleteArchive.length) {
    try {
      const data: any = await request.get("getDeleted");
      if (data.success) {
        useArchives.addDeleted(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchBackup() {
  const useArchives = useArchivesStore();
  if (!useArchives.backup.length) {
    try {
      const data: any = await request.get("getBackup");
      if (data.success) {
        useArchives.addBackup(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchSchedules() {
  const useSchedule = useScheduleStore();
  if (!useSchedule.schedule.length) {
    try {
      const data: any = await request.get("getSchedules");
      if (data.success) {
        useSchedule.addSchedules(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchClients() {
  const useClients = useClientsStore();
  if (!useClients.clients.length) {
    try {
      const data: any = await request.get("getClients");

      if (data.success) {
        useClients.setClients(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchOrder(to: any) {
  let success = true;

  const data: any = await request.get(`getOrder/${to.params.id}`);

  if (data.success) {
    const useOffer = useOfferStore();
    if (data.data.status === "Nepatvirtintas" || data.data.status === "Netinkamas") {
      const currentDate = new Date();
      const exparationDate = new Date(data.data.dateExparation);
      if (currentDate < exparationDate) {
        useOffer.setOffer({ ...data.data });
      } else {
        const data2: any = await $fetch(`addUnconfirmed/${data.data._id}`);
        if (data2.success) {
          success = false;
        }
      }
    } else {
      useOffer.setOffer({ ...data.data });
    }
  } else {
    success = false;
  }
  return success;
}

export async function fetchSelects() {
  const useSettings = useSettingsStore();
  if (!useSettings.selectValues.status.length) {
    try {
      const data: any = await request.get("getSelects");
      if (data.success) {
        useSettings.addSelectData(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchDefaultValues() {
  const useSettings = useSettingsStore();
  if (!useSettings.defaultValues.poleMain) {
    try {
      const data: any = await request.get("getDefaultValues");
      if (data.success) {
        useSettings.addDefaultValues(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchUserRights() {
  const useSettings = useSettingsStore();
  if (!useSettings.userRights.length) {
    try {
      const data: any = await request.get("getUserRights");
      if (data.success) {
        useSettings.addUserRights(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchPotentialClients() {
  const usePotentialClients = usePotentialClientsStore();
  if (!usePotentialClients.potentialClients.length) {
    try {
      const data: any = await request.get("getpotentialClients");
      if (data.success) {
        usePotentialClients.addPotentialClients(data.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}
