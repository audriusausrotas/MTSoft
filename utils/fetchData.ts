export async function fetchUser() {
  try {
    const response: any = await request.get("getUser");
    response.success && useUserStore().setUser(response.data);
    return response;
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchGates() {
  try {
    const response: any = await request.get("getGates");
    response.success && useGateStore().addGates(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchOrders() {
  try {
    const response: any = await request.get("getOrders");

    response.success && useOrderStore().addOrders(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchProductions() {
  try {
    const response: any = await request.get("getProductions");
    response.success && useProductionStore().addAll(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchProduction(id: string) {
  try {
    const response: any = await request.get(`getProduction/${id}`);
    response.success && useProductionStore().addProduction(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchInstallation() {
  try {
    const response: any = await request.get("getWorks");
    response.success && useInstallationStore().addAll(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchProjects() {
  try {
    const response: any = await request.get("getProjects");
    response.success && useProjectsStore().addProjects(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchProject(id: string) {
  try {
    const response: any = await request.get(`getProject/${id}`);
    if (response.success) {
      response.success && useProjectsStore().addProject(response.data);
    }
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchProducts() {
  try {
    const response: any = await request.get("getProducts");
    response.success && useProductsStore().addProducts(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchUsers() {
  try {
    const response: any = await request.get("getUsers");
    response.success && useUserStore().setUsers(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchArchives() {
  try {
    const response = await request.get("getArchives");
    response.success && useArchiveStore().addArchives("archive", response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchFinished() {
  try {
    const response = await request.get("getFinished");
    response.success && useArchiveStore().addArchives("finished", response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchUnconfirmed() {
  try {
    const response = await request.get("getUnconfirmed");
    response.success && useArchiveStore().addArchives("unconfirmed", response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchDeleted() {
  try {
    const response = await request.get("getDeleted");

    response.success && useArchiveStore().addArchives("deleted", response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchBackup() {
  try {
    const response = await request.get("getBackup");

    response.success && useArchiveStore().addArchives("backup", response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchSchedules() {
  try {
    const response: any = await request.get("getSchedules");
    response.success && useScheduleStore().addSchedules(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchClients() {
  try {
    const response: any = await request.get("getClients");
    response.success && useClientsStore().setClients(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchSuppliers() {
  try {
    const response: any = await request.get("getSuppliers");
    response.success && useSuppliersStore().setSuppliers(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchOrder(to: any) {
  try {
    const response: any = await request.get(`getOffer/${to.params.id}`);
    if (response.success) useOfferStore().setOffer({ ...response.data });
    else return false;
    return true;
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return false;
  }
}

export async function fetchSelects() {
  try {
    const response: any = await request.get("getSelects");
    response.success && useSettingsStore().addSelectData(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchDefaultValues() {
  try {
    const response: any = await request.get("getDefaultValues");
    response.success && useSettingsStore().addDefaultValues(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchUserRights() {
  try {
    const response: any = await request.get("getUserRights");
    response.success && useSettingsStore().addUserRights(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchPotentialClients() {
  try {
    const response: any = await request.get("getpotentialClients");
    response.success && usePotentialClientsStore().addPotentialClients(response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}
