import type { UserRights } from "~/data/interfaces";

export const fetchInitialUserData = async (userRights: UserRights | undefined) => {
  const fetchData = [fetchUsers()];

  if (userRights?.project || userRights?.warehouse) {
    fetchData.push(fetchProjects());
    fetchData.push(fetchSuppliers());
  }
  if (userRights?.schedule) fetchData.push(fetchSchedules());
  if (userRights?.production) {
    fetchData.push(fetchProductions());
    fetchData.push(fetchFences());
  }
  if (userRights?.installation) fetchData.push(fetchInstallation());
  if (userRights?.orders) fetchData.push(fetchOrders());
  if (userRights?.gate) fetchData.push(fetchGates());

  if (userRights?.admin) {
    fetchData.push(
      fetchFences(),
      fetchSelects(),
      fetchProducts(),
      fetchClients(),
      fetchDefaultValues(),
      fetchPotentialClients()
    );
  }

  await Promise.all(fetchData);
};
