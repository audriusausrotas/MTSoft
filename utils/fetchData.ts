const useProjects = useProjectsStore();

export function fetchUsers() {}

export async function fetchProjects() {
  if (useProjects.projects.length === 0) {
    const { data: projects }: any = await useFetch("/api/project");
    if (projects.value.success) {
      useProjects.addProjects(projects.value.data);
    }
  }
}
