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

export async function fetchProduction() {
  try {
    const response: any = await request.get("getProduction");
    response.success && useProductionStore().addAll(response.data);
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
    const options: any = {
      method: "GET",
      credentials: "include",
    };
    const response: any = await $fetch(`https://mtsoft.lt:3001/getArchives`, options);
    response.success && useArchiveStore().addArchives("archive", response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchUnconfirmed() {
  try {
    const response: any = await request.get("getUnconfirmed");
    response.success && useArchiveStore().addArchives("unconfirmed", response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchDeleted() {
  try {
    const response: any = await request.get("getDeleted");
    response.success && useArchiveStore().addArchives("deleted", response.data);
  } catch (error) {
    console.log("Serverio klaida: " + error);
    return { success: false, data: null };
  }
}

export async function fetchBackup() {
  try {
    const response: any = await request.get("getBackup");
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
