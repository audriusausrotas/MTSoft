export async function fetchUser() {
  const userStore = useUserStore();
  try {
    const response: any = await request.get("getUser");

    if (response.success) {
      userStore.setUser(response.data);
    }
    return response;
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchGates() {
  const gateStore = useGateStore();

  try {
    const response: any = await request.get("getGates");
    if (response.success) {
      gateStore.addGates(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchProduction() {
  const productionStore = useProductionStore();

  try {
    const response: any = await request.get("getProduction");
    if (response.success) {
      productionStore.addAll(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchInstallation() {
  const installationStore = useInstallationStore();

  try {
    const response: any = await request.get("getWorks");

    if (response.success) {
      installationStore.addAll(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchProjects() {
  const projectsStore = useProjectsStore();

  try {
    const response: any = await request.get("getProjects");
    if (response.success) {
      projectsStore.addProjects(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchProducts() {
  const productsStore = useProductsStore();

  try {
    const response: any = await request.get("getProducts");
    if (response.success) {
      productsStore.addProducts(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchUsers() {
  const userStore = useUserStore();

  try {
    const response: any = await request.get("getUsers");
    if (response.success) {
      userStore.setUsers(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchArchives() {
  const archiveStore = useArchiveStore();

  try {
    const response: any = await request.get("getArchives");
    if (response.success) {
      archiveStore.addArchives("archive", response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchUnconfirmed() {
  const archiveStore = useArchiveStore();

  try {
    const response: any = await request.get("getUnconfirmed");
    if (response.success) {
      archiveStore.addArchives("unconfirmed", response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchDeleted() {
  const archiveStore = useArchiveStore();

  try {
    const response: any = await request.get("getDeleted");
    if (response.success) {
      archiveStore.addArchives("deleted", response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchBackup() {
  const archiveStore = useArchiveStore();

  try {
    const response: any = await request.get("getBackup");
    if (response.success) {
      archiveStore.addArchives("backup", response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchSchedules() {
  const scheduleStore = useScheduleStore();

  try {
    const response: any = await request.get("getSchedules");
    if (response.success) {
      scheduleStore.addSchedules(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchClients() {
  const clientsStore = useClientsStore();

  try {
    const response: any = await request.get("getClients");

    if (response.success) {
      clientsStore.setClients(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchOrder(to: any) {
  let success = true;

  const response: any = await request.get(`getOrder/${to.params.id}`);

  if (response.success) {
    const offerStore = useOfferStore();
    if (response.data.status === "Nepatvirtintas" || response.data.status === "Netinkamas") {
      const currentDate = new Date();
      const exparationDate = new Date(response.data.dateExparation);
      if (currentDate < exparationDate) {
        offerStore.setOffer({ ...response.data });
      } else {
        const data2: any = await $fetch(`addUnconfirmed/${response.data._id}`);
        if (data2.success) {
          success = false;
        }
      }
    } else {
      offerStore.setOffer({ ...response.data });
    }
  } else {
    success = false;
  }
  return success;
}

export async function fetchSelects() {
  const settingsStore = useSettingsStore();

  try {
    const response: any = await request.get("getSelects");
    if (response.success) {
      settingsStore.addSelectData(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchDefaultValues() {
  const settingsStore = useSettingsStore();

  try {
    const response: any = await request.get("getDefaultValues");
    if (response.success) {
      settingsStore.addDefaultValues(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchUserRights() {
  const settingsStore = useSettingsStore();

  try {
    const response: any = await request.get("getUserRights");
    if (response.success) {
      settingsStore.addUserRights(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchPotentialClients() {
  const potentialClientsStore = usePotentialClientsStore();

  try {
    const response: any = await request.get("getpotentialClients");
    if (response.success) {
      potentialClientsStore.addPotentialClients(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}
