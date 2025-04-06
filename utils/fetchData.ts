export async function fetchUser() {
  const useUser = useUserStore();
  try {
    const response: any = await request.get("getUser");

    if (response.success) {
      useUser.setUser(response.data);
    }
    return response;
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchGates() {
  const useGates = useGateStore();
  if (!useGates.gates.length) {
    try {
      const response: any = await request.get("getGates");
      if (response.success) {
        useGates.addGates(response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchProduction() {
  const useProduction = useProductionStore();
  if (!useProduction.production.length) {
    try {
      const response: any = await request.get("getProduction");
      if (response.success) {
        useProduction.addAll(response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchInstallation() {
  const useInstallation = useInstallationStore();
  if (!useInstallation.installation.length) {
    try {
      const response: any = await request.get("getWorks");

      if (response.success) {
        useInstallation.addAll(response.data);
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
      const response: any = await request.get("getProjects");
      if (response.success) {
        useProjects.addProjects(response.data);
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
      const response: any = await request.get("getProducts");
      if (response.success) {
        useProducts.addProducts(response.data);
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
      const response: any = await request.get("getUsers");
      if (response.success) {
        useUser.setUsers(response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchArchives() {
  const useArchives = useArchivesStore();
  if (!useArchives.data.archive.length) {
    try {
      const response: any = await request.get("getArchives");
      if (response.success) {
        useArchives.addArchives("archive", response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchUnconfirmed() {
  const useArchives = useArchivesStore();
  if (!useArchives.data.unconfirmed.length) {
    try {
      const response: any = await request.get("getUnconfirmed");
      if (response.success) {
        useArchives.addArchives("unconfirmed", response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchDeleted() {
  const useArchives = useArchivesStore();
  if (!useArchives.data.deleted.length) {
    try {
      const response: any = await request.get("getDeleted");
      if (response.success) {
        useArchives.addArchives("deleted", response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchBackup() {
  const useArchives = useArchivesStore();
  if (!useArchives.data.backup.length) {
    try {
      const response: any = await request.get("getBackup");
      if (response.success) {
        useArchives.addArchives("backup", response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchSchedules() {
  const useSchedule = useScheduleStore();
  if (!useSchedule.schedules.length) {
    try {
      const response: any = await request.get("getSchedules");
      if (response.success) {
        useSchedule.addSchedules(response.data);
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
      const response: any = await request.get("getClients");

      if (response.success) {
        useClients.setClients(response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}

export async function fetchOrder(to: any) {
  let success = true;

  const response: any = await request.get(`getOrder/${to.params.id}`);

  if (response.success) {
    const useOffer = useOfferStore();
    if (response.data.status === "Nepatvirtintas" || response.data.status === "Netinkamas") {
      const currentDate = new Date();
      const exparationDate = new Date(response.data.dateExparation);
      if (currentDate < exparationDate) {
        useOffer.setOffer({ ...response.data });
      } else {
        const data2: any = await $fetch(`addUnconfirmed/${response.data._id}`);
        if (data2.success) {
          success = false;
        }
      }
    } else {
      useOffer.setOffer({ ...response.data });
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
      const response: any = await request.get("getSelects");
      if (response.success) {
        useSettings.addSelectData(response.data);
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
      const response: any = await request.get("getDefaultValues");
      if (response.success) {
        useSettings.addDefaultValues(response.data);
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
      const response: any = await request.get("getUserRights");
      if (response.success) {
        useSettings.addUserRights(response.data);
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
      const response: any = await request.get("getpotentialClients");
      if (response.success) {
        usePotentialClients.addPotentialClients(response.data);
      }
    } catch (error) {
      console.log("Serverio klaida: " + error);
      return { success: false, data: null };
    }
  }
}
