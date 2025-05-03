import type { UserRights } from "~/data/interfaces";

export const fetchInitialUserData = async (userRights: UserRights | undefined) => {
  const fetchData = [fetchUsers()];

  if (userRights?.project || userRights?.warehouse) fetchData.push(fetchProjects());
  if (userRights?.schedule) fetchData.push(fetchSchedules());
  if (userRights?.production) fetchData.push(fetchProductions());
  if (userRights?.installation) fetchData.push(fetchInstallation());
  if (userRights?.gate) fetchData.push(fetchGates());

  if (userRights?.admin) {
    fetchData.push(
      fetchSelects(),
      fetchProducts(),
      fetchClients(),
      fetchDefaultValues(),
      fetchPotentialClients()
    );
  }

  await Promise.all(fetchData);
};
